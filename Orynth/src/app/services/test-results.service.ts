import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, arrayUnion, docData } from '@angular/fire/firestore';
import { of, Observable, map, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { AppStateService } from './app-state.service';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class TestResultsService {
  constructor(
    private firestore: Firestore,
    private auth: AuthService,
    private appState: AppStateService,
    private snackbar: SnackbarService
  ) {}

  async addResult(subjectId: string, chapter: string, result: any) {
    if (!this.auth.isLoggedIn()) {
      return;
    }
    const uid = this.auth.getCurrentUserId();
    if (!uid) return;
    const board = this.appState.getBoard();
    const standard = this.appState.getStandard();
    const ref = doc(this.firestore, `Users/${uid}`);
    const field = `testResults.${board}.${standard}.${subjectId}.${chapter}`;
    try {
      await updateDoc(ref, { [field]: arrayUnion(result) });
      this.snackbar.show('Result saved');
      console.log('Result saved');
    } catch (err) {
      console.error('Error saving result', err);
      this.snackbar.show('Error saving result');
    }
  }

  getResults(subjectId: string, chapter: string): Observable<any[]> {
    const uid = this.auth.getCurrentUserId();
    if (!uid) return of([]);
    const board = this.appState.getBoard();
    const standard = this.appState.getStandard();
    const ref = doc(this.firestore, `Users/${uid}`);
    return docData(ref).pipe(
      map(data => (data as any)?.testResults?.[board]?.[standard]?.[subjectId]?.[chapter] || []),
      catchError(err => {
        console.error('Error loading results', err);
        this.snackbar.show('Error loading results');
        return of([]);
      }),
      map(res => {
        console.log('Results loaded');
        return res;
      })
    );
  }
}
