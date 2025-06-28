import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button';

@Component({
  selector: 'app-onboarding-page',
  imports: [RouterModule, ButtonComponent],
  templateUrl: './onboarding-page.html',
  styleUrl: './onboarding-page.scss'
})
export class OnboardingPageComponent {

}
