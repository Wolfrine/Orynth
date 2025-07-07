import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-onboarding-page',
  standalone: true,
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
    this.auth.authState$.subscribe(async user => {
      if (!user || user.isAnonymous) {
        return;
      }

      const profileRef = doc(this.firestore, `Users/${user.uid}`);
      const snap = await getDoc(profileRef);

      if (snap.exists()) {
        const data = snap.data() as any;
        const profile = data.profile || {};
        if (profile.board && profile.standard) {
          this.appState.setBoard(profile.board);
          this.appState.setStandard(profile.standard);
          await this.router.navigate(['/subject-list']);
          return;
        }
      }

      await this.router.navigate(['/board-class-selection']);
    });
  }

  async startTracking() {
    const user = await this.auth.signInAnonymouslyIfNeeded();
    if (user) {
      await this.router.navigate(['/board-class-selection']);
    }
  }
}
