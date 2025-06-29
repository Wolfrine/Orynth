import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private firestore: Firestore, private auth: AuthService) { }

  async setProgress(subjectId: string, data: any) {
    const uid = this.auth.getCurrentUserId();
    const ref = doc(this.firestore, `Users/${uid}/Progress/${subjectId}`);
    await setDoc(ref, data, { merge: true });
  }
}
