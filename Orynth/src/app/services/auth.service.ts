import { Injectable } from '@angular/core';
import { Auth, signInAnonymously, User, authState, linkWithPopup, GoogleAuthProvider, linkWithPhoneNumber } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.authState$ = authState(this.auth);
  }

  async signInAnonymouslyIfNeeded(): Promise<User> {
    if (this.auth.currentUser) {
      return this.auth.currentUser;
    }
    const cred = await signInAnonymously(this.auth);
    return cred.user;
  }

  getCurrentUserId(): string {
    return this.auth.currentUser?.uid ?? '';
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  upgradeWithGoogle() {
    if (!this.auth.currentUser) throw new Error('No current user');
    return linkWithPopup(this.auth.currentUser, new GoogleAuthProvider());
  }

  upgradeWithPhoneNumber(phoneNumber: string, appVerifier: any) {
    if (!this.auth.currentUser) throw new Error('No current user');
    return linkWithPhoneNumber(this.auth.currentUser, phoneNumber, appVerifier);
  }
}
