import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../../components/chip/chip';
import { AppStateService } from '../../services/app-state.service';
import { SyllabusService } from '../../services/syllabus.service';

@Component({
  selector: 'app-chapter-tracker-page',
  imports: [CommonModule, RouterModule, ChipComponent],
  templateUrl: './chapter-tracker-page.html',
  styleUrl: './chapter-tracker-page.scss'
})
export class ChapterTrackerPageComponent implements OnInit {
  chapters: any[] = [];
  subject = '';
  constructor(private appState: AppStateService, private syllabusService: SyllabusService) {
    this.subject = this.appState.getSubject();
  }

  ngOnInit(): void {
    this.syllabusService.getSyllabusTree().subscribe(data => {
      const board = this.appState.getBoard();
      const standard = this.appState.getStandard();
      const subject = this.appState.getSubject();
      if (data && data[board] && data[board][standard] && data[board][standard][subject]) {
        this.chapters = data[board][standard][subject];
      }
    });
  }

  get completedCount(): number {
    return this.chapters.filter(c => c.status === 'done').length;
  }

  get completionPercentage(): number {
    return this.chapters.length === 0
      ? 0
      : (this.completedCount / this.chapters.length) * 100;
  }
}
