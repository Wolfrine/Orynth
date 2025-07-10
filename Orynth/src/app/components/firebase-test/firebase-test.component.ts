import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-firebase-test',
  standalone: true,
  imports: [CommonModule],
  template: `<p>firebase test works</p>`
})
export class FirebaseTestComponent implements OnInit {
  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    try {
      const ref = doc(this.firestore, 'test/doc');
      const snap = await getDoc(ref);
      console.log('Firebase test success:', snap.exists());
    } catch (err) {
      console.error('Firebase test error:', err);
    }
  }
}
