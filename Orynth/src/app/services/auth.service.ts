import { Injectable } from '@angular/core';
import { Auth, User, authState, linkWithPopup, GoogleAuthProvider, linkWithPhoneNumber, signInWithPopup, signInWithCredential, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<User | null>;
  private isAdmin = false;

  constructor(private auth: Auth, private firestore: Firestore, private appState: AppStateService) {
    this.authState$ = authState(this.auth);
    this.authState$.subscribe(async user => {
      if (user && !user.isAnonymous) {
        await this.updateLastLogin(user.uid);
        await this.loadAdminStatus(user.uid);
      }
    });
  }

  getCurrentUserId(): string {
    return this.appState.getSelectedUserId() || (this.auth.currentUser?.uid ?? '');
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser && !this.auth.currentUser.isAnonymous;
  }

  isAnonymous(): boolean {
    return !!this.auth.currentUser && this.auth.currentUser.isAnonymous;
  }

  async loginWithGoogle() {
    try {
      const cred = await signInWithPopup(this.auth, new GoogleAuthProvider());
      await this.saveUserInfo(cred.user);
      await this.updateLastLogin(cred.user.uid);
      return cred;
    } catch (err) {
      console.error('Google sign-in failed', err);
      throw err;
    }
  }

  async upgradeWithGoogle() {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No current user');
    try {
      const cred = await linkWithPopup(user, new GoogleAuthProvider());
      await this.saveUserInfo(cred.user);
      await this.updateLastLogin(cred.user.uid);
      return cred;
    } catch (err: any) {
      if (err.code === 'auth/credential-already-in-use') {
        const credential = GoogleAuthProvider.credentialFromError(err);
        let cred;
        if (credential) {
          cred = await signInWithCredential(this.auth, credential);
        } else {
          cred = await signInWithPopup(this.auth, new GoogleAuthProvider());
        }
        await this.saveUserInfo(cred.user);
        return cred;
      }
      throw err;
    }
  }

  async logout() {
    await signOut(this.auth);
  }

  async upgradeWithPhoneNumber(phoneNumber: string, appVerifier: any) {
    if (!this.auth.currentUser) throw new Error('No current user');
    return linkWithPhoneNumber(this.auth.currentUser, phoneNumber, appVerifier);
  }

  private async saveUserInfo(user: User) {
    const ref = doc(this.firestore, `Users/${user.uid}`);
    await setDoc(ref, {
      info: {
        displayName: user.displayName ?? '',
        email: user.email ?? '',
        photoURL: user.photoURL ?? ''
      },
      lastLogin: serverTimestamp()
    }, { merge: true });
  }

  private async updateLastLogin(uid: string) {
    const ref = doc(this.firestore, `Users/${uid}`);
    await setDoc(ref, { lastLogin: serverTimestamp() }, { merge: true });
  }

  private async loadAdminStatus(uid: string) {
    const ref = doc(this.firestore, `Users/${uid}`);
    const snap = await getDoc(ref);
    this.isAdmin = snap.exists() ? !!(snap.data() as any).admin : false;
  }

  isUserAdmin(): boolean {
    return this.isAdmin;
  }
}
