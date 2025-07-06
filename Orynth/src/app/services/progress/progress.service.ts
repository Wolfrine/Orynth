import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private firestore: Firestore, private auth: AuthService) { }

  async setProgress(subjectId: string, data: any) {
    const uid = this.auth.getCurrentUserId();
    const ref = doc(this.firestore, `Users/${uid}`);
    await setDoc(ref, { progress: { [subjectId]: data } }, { merge: true });
  }

  getProgress(subjectId: string): Observable<any | undefined> {
    const uid = this.auth.getCurrentUserId();
    const ref = doc(this.firestore, `Users/${uid}`);
    return docData(ref).pipe(
      map(data => (data as any)?.progress?.[subjectId])
    );
  }
}
