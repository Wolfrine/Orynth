import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TestResultsService } from '../../services/test-results.service';
import { AppStateService } from '../../services/app-state.service';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';

@Component({
  selector: 'app-add-test-results-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BottomNavComponent],
  templateUrl: './add-test-results-page.html',
  styleUrl: './add-test-results-page.scss'
})
export class AddTestResultsPageComponent implements OnInit {
  chapter = '';
  subject = '';
  testType = 'Test';
  totalMarks: number | null = null;
  marksAchieved: number | null = null;
  results: any[] = [];

  constructor(
    private router: Router,
    private testResults: TestResultsService,
    private appState: AppStateService
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.chapter = nav?.extras.state?.['chapter'] || '';
    this.subject = this.appState.getSubject();
    this.loadResults();
  }

  async loadResults() {
    this.testResults.getResults(this.subject, this.chapter).subscribe(r => {
      this.results = Array.isArray(r) ? r : [];
    });
  }

  async save() {
    if (this.totalMarks == null || this.marksAchieved == null) return;
    const entry = {
      testType: this.testType,
      totalMarks: this.totalMarks,
      marksAchieved: this.marksAchieved,
      timestamp: new Date().toISOString()
    };
    await this.testResults.addResult(this.subject, this.chapter, entry);
    this.totalMarks = null;
    this.marksAchieved = null;
    this.loadResults();
  }

  goBack() {
    this.router.navigate(['/chapter-tracker']);
  }
}
