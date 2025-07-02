import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';
import { SyllabusService } from '../../services/syllabus.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-subject-list-page',
  imports: [CommonModule, RouterModule, CardComponent, ProgressBarComponent],
  templateUrl: './subject-list-page.html',
  styleUrl: './subject-list-page.scss'
})
export class SubjectListPageComponent implements OnInit {

  subjects: any[] = [];
  noData = false;

  constructor(private syllabusService: SyllabusService, private appState: AppStateService, private router: Router) {}

  ngOnInit(): void {
    this.syllabusService.getSyllabusTree().subscribe(data => {
      const board = this.appState.getBoard();
      const standard = this.appState.getStandard();
      if (data && data[board] && data[board][standard]) {
        this.subjects = Object.keys(data[board][standard]).map(key => ({ id: key, name: key, progress: 0 }));
      } else {
        this.subjects = [];
      }
      this.noData = this.subjects.length === 0;
    });
  }

  openSubject(name: string) {
    this.appState.setSubject(name);
    this.router.navigate(['/chapter-tracker']);
  }
}
