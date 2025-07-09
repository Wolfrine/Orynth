import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';
import { TestResultsService } from '../../services/test-results.service';
import { AppStateService } from '../../services/app-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-test-results-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BottomNavComponent],
  templateUrl: './add-test-results-page.html'
})
export class AddTestResultsPageComponent implements OnInit {
  testType: 'Test' | 'Exam' | 'Practice' = 'Test';
  totalMarks: number | null = null;
  marksAchieved: number | null = null;
  chapter = '';
  results$!: Observable<any>;

  constructor(
    private router: Router,
    private testResultsService: TestResultsService,
    private appState: AppStateService
  ) {
    this.results$ = this.testResultsService.getTestResults();
  }

  ngOnInit(): void {
    this.chapter = this.appState.getChapter();
  }

  async save() {
    if (this.totalMarks === null || this.marksAchieved === null) {
      return;
    }
    await this.testResultsService.addTestResult({
      chapter: this.chapter,
      type: this.testType,
      totalMarks: this.totalMarks,
      marksAchieved: this.marksAchieved,
      date: new Date().toISOString()
    });
    this.router.navigate(['/chapter-tracker']);
  }
}
