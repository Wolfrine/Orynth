import { Injectable } from '@angular/core';
import { Auth, signInAnonymously, User, authState, linkWithPopup, GoogleAuthProvider, linkWithPhoneNumber } from '@angular/fire/auth';
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
    return !!this.auth.currentUser;
  }

  async upgradeWithGoogle() {
    if (!this.auth.currentUser) throw new Error('No current user');
    const cred = await linkWithPopup(this.auth.currentUser, new GoogleAuthProvider());
    await this.saveUserInfo(cred.user);
    return cred;
  }

  async upgradeWithPhoneNumber(phoneNumber: string, appVerifier: any) {
    if (!this.auth.currentUser) throw new Error('No current user');
    return linkWithPhoneNumber(this.auth.currentUser, phoneNumber, appVerifier);
  }

  private async saveUserInfo(user: User) {
    const ref = doc(this.firestore, `Users/${user.uid}/info`);
    await setDoc(ref, {
      displayName: user.displayName ?? '',
      email: user.email ?? '',
      photoURL: user.photoURL ?? ''
    }, { merge: true });
  }
}
