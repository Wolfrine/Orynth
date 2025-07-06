import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SyllabusService } from '../../services/syllabus.service';
import { AppStateService } from '../../services/app-state.service';
import { AuthService } from '../../services/auth.service';
import { ProgressService } from '../../services/progress/progress.service';
import { UnsyncedNoticeComponent } from '../../components/unsynced-notice/unsynced-notice';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';

@Component({
  selector: 'app-subject-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, UnsyncedNoticeComponent, BottomNavComponent],
  templateUrl: './subject-list-page.html',
  styleUrl: './subject-list-page.scss'
})
export class SubjectListPageComponent implements OnInit {

  subjects: any[] = [];
  noData = false;
  startedCount = 0;
  overallProgress = 0;

  constructor(
    private syllabusService: SyllabusService,
    private appState: AppStateService,
    private router: Router,
    public auth: AuthService,
    private progressService: ProgressService
  ) {}

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
          const subj = { id: key, name: key, progress };
          this.progressService.getProgress(key).subscribe(remote => {
            if (remote && Array.isArray(remote)) {
              const completed = remote.filter((c: any) => c.status === 'done').length;
              subj.progress = Math.round((completed / remote.length) * 100);
              localStorage.setItem(`${key}-progress`, JSON.stringify(remote));
              this.startedCount = this.subjects.filter(s => s.progress > 0).length;
              this.overallProgress = this.subjects.length === 0
                ? 0
                : Math.round(this.subjects.reduce((acc, cur) => acc + cur.progress, 0) / this.subjects.length);
            }
          });
          return subj;
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
