import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubjectProgressRingComponent } from '../../components/subject-progress-ring/subject-progress-ring';
import { ButtonComponent } from '../../components/button/button';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';
import { AppStateService } from '../../services/app-state.service';
import { SyllabusService } from '../../services/syllabus.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    CommonModule,
    RouterModule,
    SubjectProgressRingComponent,
    ButtonComponent,
    BottomNavComponent
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPageComponent implements OnInit {
  summary = {
    subject: '',
    progress: 0
  };

  subjects: { name: string; progress: number; color: string }[] = [];
  focusArea: { name: string; progress: number } | null = null;
  goodSubject: { name: string; progress: number } | null = null;
  colors = [
    'bg-indigo-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-pink-500',
    'bg-teal-500'
  ];

  constructor(private appState: AppStateService, private syllabusService: SyllabusService) {}

  ngOnInit(): void {
    this.summary.subject = this.appState.getSubject();
    const board = this.appState.getBoard();
    const standard = this.appState.getStandard();
    this.syllabusService.getSyllabusTree().subscribe(data => {
      if (data && data[board] && data[board][standard]) {
        const keys = Object.keys(data[board][standard]);
        this.subjects = keys.map((name, idx) => {
          const saved = localStorage.getItem(`${name}-progress`);
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
          return { name, progress, color: this.colors[idx % this.colors.length] };
        });
        if (this.subjects.length) {
          const sorted = [...this.subjects].sort((a, b) => a.progress - b.progress);
          this.focusArea = sorted[0];
          this.goodSubject = sorted[sorted.length - 1];
          this.summary.progress = Math.round(this.subjects.reduce((a, c) => a + c.progress, 0) / this.subjects.length);
        }
      }
    });
  }
}
