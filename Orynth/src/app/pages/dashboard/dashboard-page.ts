import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubjectProgressRingComponent } from '../../components/subject-progress-ring/subject-progress-ring';
import { ButtonComponent } from '../../components/button/button';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterModule, SubjectProgressRingComponent, ButtonComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPageComponent {

  summary = {
    subject: 'Math',
    progress: 68
  };
}
