import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable, map, of, catchError } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppStateService } from '../app-state.service';
import { SnackbarService } from '../snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(
    private firestore: Firestore,
    private auth: AuthService,
    private appState: AppStateService,
    private snackbar: SnackbarService
  ) { }

  async setProgress(subjectId: string, data: any) {
    if (!this.auth.isLoggedIn()) {
      return;
    }
    const uid = this.auth.getCurrentUserId();
    if (!uid) {
      return;
    }
    const board = this.appState.getBoard();
    const standard = this.appState.getStandard();
    const ref = doc(this.firestore, `Users/${uid}`);
    try {
      await setDoc(ref, {
        progress: {
          [board]: {
            [standard]: {
              [subjectId]: data
            }
          }
        }
      }, { merge: true });
      this.snackbar.show('Progress saved');
      console.log('Progress saved');
    } catch (err) {
      console.error('Error saving progress', err);
      this.snackbar.show('Error saving progress');
    }
  }

  async setAllProgress(progressMap: any) {
    if (!this.auth.isLoggedIn()) {
      return;
    }
    const uid = this.auth.getCurrentUserId();
    if (!uid) {
      return;
    }
    const board = this.appState.getBoard();
    const standard = this.appState.getStandard();
    const ref = doc(this.firestore, `Users/${uid}`);
    try {
      await setDoc(ref, {
        progress: {
          [board]: {
            [standard]: progressMap
          }
        }
      }, { merge: true });
      this.snackbar.show('Progress synced');
      console.log('Progress synced');
    } catch (err) {
      console.error('Error syncing progress', err);
      this.snackbar.show('Error syncing progress');
    }
  }

  getProgress(subjectId: string): Observable<any | undefined> {
    const uid = this.auth.getCurrentUserId();
    if (!uid) {
      return of(undefined);
    }
    const board = this.appState.getBoard();
    const standard = this.appState.getStandard();
    const ref = doc(this.firestore, `Users/${uid}`);
    return docData(ref).pipe(
      map(data => (data as any)?.progress?.[board]?.[standard]?.[subjectId]),
      catchError(err => {
        console.error('Error loading progress', err);
        this.snackbar.show('Error loading progress');
        return of(undefined);
      })
    );
  }

  // confidence values are stored alongside chapter progress within the main
  // progress object. Updating progress will also persist confidence.
}
