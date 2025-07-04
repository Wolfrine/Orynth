import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-onboarding-page',
  imports: [RouterModule],
  templateUrl: './onboarding-page.html'
})
export class OnboardingPageComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private firestore: Firestore,
    private appState: AppStateService,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = await this.auth.signInAnonymouslyIfNeeded();
    const profileRef = doc(this.firestore, `Users/${user.uid}/profile`);
    const snap = await getDoc(profileRef);
    if (snap.exists()) {
      const profile = snap.data() as any;
      if (profile.board && profile.standard) {
        this.appState.setBoard(profile.board);
        this.appState.setStandard(profile.standard);
        this.router.navigate(['/subject-list']);
        return;
      }
    }
  }

  async startTracking() {
    const user = await this.auth.signInAnonymouslyIfNeeded();
    console.log('Auth UID:', user.uid);
  }
}
