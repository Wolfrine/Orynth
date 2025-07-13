import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TestResultsService } from '../../services/test-results.service';
import { AppStateService } from '../../services/app-state.service';
import { AuthService } from '../../services/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
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
    private appState: AppStateService,
    private firestore: Firestore,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.chapter = nav?.extras.state?.['chapter'] || '';
    this.subject = this.appState.getSubject();
    this.ensureProfileLoaded().then(() => {
      this.loadResults();
    });
  }

  async loadResults() {
    this.testResults.getResults(this.subject, this.chapter).subscribe(r => {
      this.results = Array.isArray(r) ? r : [];
    });
  }

  private async ensureProfileLoaded(): Promise<void> {
    if (!this.appState.getBoard() || !this.appState.getStandard()) {
      const uid = this.auth.getCurrentUserId();
      if (uid) {
        const ref = doc(this.firestore, `Users/${uid}`);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as any;
          const profile = data.profile || {};
          if (profile.board) this.appState.setBoard(profile.board);
          if (profile.standard) this.appState.setStandard(profile.standard);
        }
      }
    }
  }

  async save() {
    if (this.totalMarks == null || this.marksAchieved == null) return;
    await this.ensureProfileLoaded();
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
