import { Injectable } from '@angular/core';
import { Auth, signInAnonymously, User, authState, GoogleAuthProvider, linkWithPhoneNumber, signInWithPopup, signOut } from '@angular/fire/auth';
import { Observable, take } from 'rxjs';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<User | null>;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.authState$ = authState(this.auth);
    this.authState$.pipe(take(1)).subscribe(user => {
      if (!user) {
        signInAnonymously(this.auth).catch(err => {
          console.error('Anonymous sign-in failed', err);
        });
      }
    });
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

  async loginWithGoogle() {
    try {
      const cred = await signInWithPopup(this.auth, new GoogleAuthProvider());
      await this.saveUserInfo(cred.user);
      return cred;
    } catch (err) {
      console.error('Google sign-in failed', err);
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
