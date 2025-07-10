import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable, map, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppStateService } from '../app-state.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(
    private firestore: Firestore,
    private auth: AuthService,
    private appState: AppStateService
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
    await setDoc(ref, {
      progress: {
        [board]: {
          [standard]: {
            [subjectId]: data
          }
        }
      }
    }, { merge: true });
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
    await setDoc(ref, {
      progress: {
        [board]: {
          [standard]: progressMap
        }
      }
    }, { merge: true });
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
      map(data => (data as any)?.progress?.[board]?.[standard]?.[subjectId])
    );
  }
}
