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
    const board = this.appState.getBoard();
    const standard = this.appState.getStandard();

    console.log('Attempting to save result', { uid, board, standard, subjectId, chapter, result });

    if (!uid || !board || !standard || !subjectId) {
      console.error('Missing data for saving result', { uid, board, standard, subjectId, chapter });
      this.snackbar.show('Error saving result');
      return;
    }

    if (!chapter) {
      console.error('Cannot save result: no chapter provided');
      this.snackbar.show('Chapter not specified');
      return;
    }

    const sanitizedChapter = chapter.replace(/[.#$\[\]/]/g, '_');
    const ref = doc(this.firestore, `Users/${uid}`);
    const field = `testResults.${board}.${standard}.${subjectId}.${sanitizedChapter}`;
    try {
      await updateDoc(ref, { [field]: arrayUnion(result) });
      this.snackbar.show('Result saved');
      console.log('Result saved', result);
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

    if (!chapter) {
      console.error('Cannot load results: no chapter provided');
      return of([]);
    }

    const sanitizedChapter = chapter.replace(/[.#$\[\]/]/g, '_');
    const ref = doc(this.firestore, `Users/${uid}`);
    return docData(ref).pipe(
      map(data => (data as any)?.testResults?.[board]?.[standard]?.[subjectId]?.[sanitizedChapter] || []),
      catchError(err => {
        console.error('Error loading results', err);
        this.snackbar.show('Error loading results');
        return of([]);
      }),
      map(res => {
        console.log('Results loaded', res);
      return res;
    })
  );
  }

  getSubjectSummary(subjectId: string): Observable<{ total: number; avgScore: number }> {
    const uid = this.auth.getCurrentUserId();
    if (!uid) return of({ total: 0, avgScore: 0 });
    const board = this.appState.getBoard();
    const standard = this.appState.getStandard();
    const ref = doc(this.firestore, `Users/${uid}`);
    return docData(ref).pipe(
      map(data => {
        const subj: any = (data as any)?.testResults?.[board]?.[standard]?.[subjectId] || {};
        const all: any[] = [];
        Object.values(subj).forEach((arr: any) => {
          if (Array.isArray(arr)) all.push(...arr);
        });
        const total = all.length;
        let avgScore = 0;
        if (total > 0) {
          const sum = all.reduce((acc, r) => {
            const achieved = r.marksAchieved ?? r.achievedMarks ?? 0;
            const totalMarks = r.totalMarks ?? 0;
            return acc + (totalMarks > 0 ? (achieved / totalMarks) * 100 : 0);
          }, 0);
          avgScore = Math.round(sum / total);
        }
        return { total, avgScore };
      }),
      catchError(err => {
        console.error('Error loading results', err);
        this.snackbar.show('Error loading results');
        return of({ total: 0, avgScore: 0 });
      })
    );
  }

  getChapterSummary(subjectId: string, chapter: string): Observable<{ total: number; avgScore: number }> {
    const uid = this.auth.getCurrentUserId();
    if (!uid) return of({ total: 0, avgScore: 0 });
    const board = this.appState.getBoard();
    const standard = this.appState.getStandard();
    const sanitizedChapter = chapter.replace(/[.#$\[\]/]/g, '_');
    const ref = doc(this.firestore, `Users/${uid}`);
    return docData(ref).pipe(
      map(data => {
        const arr: any[] = (data as any)?.testResults?.[board]?.[standard]?.[subjectId]?.[sanitizedChapter] || [];
        const total = arr.length;
        let avgScore = 0;
        if (total > 0) {
          const sum = arr.reduce((acc, r) => {
            const achieved = r.marksAchieved ?? r.achievedMarks ?? 0;
            const totalMarks = r.totalMarks ?? 0;
            return acc + (totalMarks > 0 ? (achieved / totalMarks) * 100 : 0);
          }, 0);
          avgScore = Math.round(sum / total);
        }
        return { total, avgScore };
      }),
      catchError(err => {
        console.error('Error loading results', err);
        this.snackbar.show('Error loading results');
        return of({ total: 0, avgScore: 0 });
      })
    );
  }
}
