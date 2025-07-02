import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubjectProgressRingComponent } from '../../components/subject-progress-ring/subject-progress-ring';
import { ButtonComponent } from '../../components/button/button';
import { AppStateService } from '../../services/app-state.service';
import { SyllabusService } from '../../services/syllabus.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterModule, SubjectProgressRingComponent, ButtonComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPageComponent implements OnInit {

  summary = {
    subject: '',
    progress: 0
  };

  constructor(private appState: AppStateService, private syllabusService: SyllabusService) {}

  ngOnInit(): void {
    this.summary.subject = this.appState.getSubject();
    // Additional stats can be calculated using syllabusService if needed.
  }
}
