import { Injectable } from '@angular/core';
import { Auth, signInAnonymously, User, authState, linkWithPopup, GoogleAuthProvider, linkWithPhoneNumber, signInWithPopup, signInWithCredential, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<User | null>;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.authState$ = authState(this.auth);
  }

  async signInAnonymouslyIfNeeded(): Promise<User | null> {
    if (this.auth.currentUser) {
      return this.auth.currentUser;
    }
    try {
      const cred = await signInAnonymously(this.auth);
      return cred.user;
    } catch (error) {
      console.error('Anonymous sign-in failed', error);
      return this.auth.currentUser ?? null;
    }
  }

  getCurrentUserId(): string {
    return this.auth.currentUser?.uid ?? '';
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser && !this.auth.currentUser.isAnonymous;
  }

  isAnonymous(): boolean {
    return !!this.auth.currentUser && this.auth.currentUser.isAnonymous;
  }

  async upgradeWithGoogle() {
    if (!this.auth.currentUser) throw new Error('No current user');
    try {
      const cred = await linkWithPopup(this.auth.currentUser, new GoogleAuthProvider());
      await this.saveUserInfo(cred.user);
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
      }
    }, { merge: true });
  }
}
