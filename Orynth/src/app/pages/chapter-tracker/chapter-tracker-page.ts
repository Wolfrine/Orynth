import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../../components/chip/chip';
import { AppStateService } from '../../services/app-state.service';
import { SyllabusService } from '../../services/syllabus.service';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';
import { AuthService } from '../../services/auth.service';
import { ProgressService } from '../../services/progress/progress.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chapter-tracker-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ChipComponent,
    BottomNavComponent
  ],
  templateUrl: './chapter-tracker-page.html',
  styleUrl: './chapter-tracker-page.scss'
})
export class ChapterTrackerPageComponent implements OnInit, OnDestroy {
  chapters: any[] = [];
  subject = '';
  noData = false;
  private allSubjects: string[] = [];
  private progressSub?: Subscription;
  constructor(
    private appState: AppStateService,
    private syllabusService: SyllabusService,
    private progressService: ProgressService,
    public auth: AuthService
  ) {
    this.subject = this.appState.getSubject();
  }

  ngOnInit(): void {
    this.syllabusService.getSyllabusTree().subscribe(data => {
      const board = this.appState.getBoard();
      const standard = this.appState.getStandard();
      const subject = this.appState.getSubject();
      this.allSubjects = Object.keys(data?.[board]?.[standard] || {});
      if (data && data[board] && data[board][standard] && data[board][standard][subject]) {
        const chaptersData = data[board][standard][subject];
        if (Array.isArray(chaptersData)) {
          if (chaptersData.length > 0 && typeof chaptersData[0] === 'string') {
            this.chapters = chaptersData.map((name: string, i: number) => ({ id: i, name, status: 'pending', confidence: 0 }));
          } else {
            this.chapters = chaptersData;
          }
        } else {
          this.chapters = [];
        }
      } else {
        this.chapters = [];
      }

      const saved = localStorage.getItem(`${subject}-progress`);
      if (saved) {
        try {
          const savedChapters = JSON.parse(saved);
          this.chapters = this.chapters.map(c => {
            const match = savedChapters.find((s: any) => s.id === c.id && s.name === c.name);
            return match ? { ...c, status: match.status, confidence: match.confidence } : c;
          });
        } catch {}
      }

      this.progressSub = this.progressService.getProgress(subject).subscribe(remote => {
        if (remote && Array.isArray(remote)) {
          this.chapters = this.chapters.map(c => {
            const match = remote.find((s: any) => s.id === c.id && s.name === c.name);
            return match ? { ...c, status: match.status, confidence: match.confidence } : c;
          });
          localStorage.setItem(`${subject}-progress`, JSON.stringify(this.chapters));
        }
      });

      this.noData = this.chapters.length === 0;
    });
  }

  cycleStatus(chapter: any) {
    const cycle = ['pending', 'in-progress', 'done'];
    const idx = cycle.indexOf(chapter.status);
    chapter.status = cycle[(idx + 1) % cycle.length];
    this.saveProgress();
  }

  saveProgress() {
    localStorage.setItem(`${this.subject}-progress`, JSON.stringify(this.chapters));
    const progress: any = {};
    this.allSubjects.forEach(sub => {
      const saved = localStorage.getItem(`${sub}-progress`);
      try {
        progress[sub] = saved ? JSON.parse(saved) : [];
      } catch {
        progress[sub] = [];
      }
    });
    this.progressService.setAllProgress(progress);
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'done': return 'Completed';
      case 'in-progress': return 'In Progress';
      default: return 'Pending';
    }
  }

  get completedCount(): number {
    return this.chapters.filter(c => c.status === 'done').length;
  }

  get completionPercentage(): number {
    return this.chapters.length === 0
      ? 0
      : (this.completedCount / this.chapters.length) * 100;
  }

  ngOnDestroy(): void {
    this.progressSub?.unsubscribe();
  }
}
