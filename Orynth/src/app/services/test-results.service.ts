import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, docData, arrayUnion } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

export interface TestResult {
  chapter: string;
  type: 'Test' | 'Exam' | 'Practice';
  totalMarks: number;
  marksAchieved: number;
  date: string;
}

@Injectable({ providedIn: 'root' })
export class TestResultsService {
  constructor(private firestore: Firestore, private auth: AuthService) {}

  async addTestResult(result: TestResult) {
    if (!this.auth.isLoggedIn()) {
      return;
    }
    const uid = this.auth.getCurrentUserId();
    const ref = doc(this.firestore, `Users/${uid}`);
    await setDoc(ref, { testResults: arrayUnion(result) }, { merge: true });
  }

  getTestResults(): Observable<TestResult[]> {
    const uid = this.auth.getCurrentUserId();
    const ref = doc(this.firestore, `Users/${uid}`);
    return docData(ref).pipe(map(d => (d as any)?.testResults ?? []));
  }
}
