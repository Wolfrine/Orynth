import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SyllabusService } from '../../services/syllabus.service';
import { AppStateService } from '../../services/app-state.service';
import { UnsyncedNoticeComponent } from '../../components/unsynced-notice/unsynced-notice';

@Component({
  selector: 'app-subject-list-page',
  imports: [CommonModule, RouterModule, UnsyncedNoticeComponent],
  templateUrl: './subject-list-page.html',
  styleUrl: './subject-list-page.scss'
})
export class SubjectListPageComponent implements OnInit {

  subjects: any[] = [];
  noData = false;
  startedCount = 0;
  overallProgress = 0;

  constructor(private syllabusService: SyllabusService, private appState: AppStateService, private router: Router) {}

  ngOnInit(): void {
    this.syllabusService.getSyllabusTree().subscribe(data => {
      const board = this.appState.getBoard();
      const standard = this.appState.getStandard();
      if (data && data[board] && data[board][standard]) {
        this.subjects = Object.keys(data[board][standard]).map(key => {
          const saved = localStorage.getItem(`${key}-progress`);
          let progress = 0;
          if (saved) {
            try {
              const chapters = JSON.parse(saved);
              if (chapters.length) {
                const completed = chapters.filter((c: any) => c.status === 'done').length;
                progress = Math.round((completed / chapters.length) * 100);
              }
            } catch {}
          }
          return { id: key, name: key, progress };
        });
      } else {
        this.subjects = [];
      }
      this.noData = this.subjects.length === 0;
      this.startedCount = this.subjects.filter(s => s.progress > 0).length;
      this.overallProgress = this.subjects.length === 0
        ? 0
        : Math.round(this.subjects.reduce((acc, cur) => acc + cur.progress, 0) / this.subjects.length);
    });
  }

  openSubject(name: string) {
    this.appState.setSubject(name);
    this.router.navigate(['/chapter-tracker']);
  }
}
