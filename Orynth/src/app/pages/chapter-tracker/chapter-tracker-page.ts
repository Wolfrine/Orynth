import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../../components/chip/chip';
import { AppStateService } from '../../services/app-state.service';
import { SyllabusService } from '../../services/syllabus.service';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';
import { AuthService } from '../../services/auth.service';
import { ProgressService } from '../../services/progress/progress.service';
import { Chapter } from '../../interfaces/chapter.model';
import { Subscription } from 'rxjs';
import { TestResultsService } from '../../services/test-results.service';

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
  chapters: Chapter[] = [];
  subject = '';
  noData = false;
  private allSubjects: string[] = [];
  private progressSub?: Subscription;
  constructor(
    private appState: AppStateService,
    private syllabusService: SyllabusService,
    private progressService: ProgressService,
    public auth: AuthService,
    private router: Router,
    private testResults: TestResultsService
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
            this.chapters = chaptersData.map((name: string, i: number) => ({ id: i, name, status: 'pending', confidence: 'low' as const, results: [], resultsSummary: { total: 0, avgScore: 0 } }));
          } else {
            this.chapters = chaptersData.map((c: any) => ({ ...c, results: c.results || [], resultsSummary: c.resultsSummary || { total: 0, avgScore: 0 } }));
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
          this.chapters.forEach(ch => {
            const match = remote.find((s: any) => s.id === ch.id && s.name === ch.name);
            if (match) {
              ch.status = match.status;
              ch.confidence = match.confidence;
            }
          });
          localStorage.setItem(`${subject}-progress`, JSON.stringify(this.chapters));
        }
      });

      this.chapters.forEach(ch => {
        this.testResults.getChapterSummary(subject, ch.name).subscribe(sum => {
          (ch as any).resultsSummary = sum;
        });
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

  cycleConfidence(chapter: Chapter) {
    const cycle: Chapter['confidence'][] = ['low', 'medium', 'high'];
    const idx = cycle.indexOf(chapter.confidence);
    chapter.confidence = cycle[(idx + 1) % cycle.length];
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

  addResults(chapter: any) {
    this.router.navigate(['/add-test-results'], { state: { chapter: chapter.name } });
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'done': return 'Completed';
      case 'in-progress': return 'In Progress';
      default: return 'Pending';
    }
  }

  getConfidenceLabel(level: Chapter['confidence']): string {
    switch (level) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      default: return 'Low';
    }
  }

  getConfidenceColor(level: Chapter['confidence']): 'pending' | 'in-progress' | 'done' {
    switch (level) {
      case 'high': return 'done';
      case 'medium': return 'in-progress';
      default: return 'pending';
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
