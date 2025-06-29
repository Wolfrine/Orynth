import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-onboarding-page',
  imports: [RouterModule],
  templateUrl: './onboarding-page.html'
})
export class OnboardingPageComponent {

  constructor(private auth: AuthService) {}

  async startTracking() {
    const user = await this.auth.signInAnonymouslyIfNeeded();
    console.log('Auth UID:', user.uid);
  }
}
