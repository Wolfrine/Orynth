import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-feedback-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-page.html'
})
export class FeedbackPageComponent {
  board = '';
  standard = '';
  message = '';
  submitted = false;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private auth: AuthService
  ) {}

  async submit() {
    await addDoc(collection(this.firestore, 'user_feedback'), {
      uid: this.auth.getCurrentUserId() || null,
      board: this.board,
      standard: this.standard,
      message: this.message,
      timestamp: new Date().toISOString()
    });
    this.board = '';
    this.standard = '';
    this.message = '';
    this.submitted = true;
  }

  goBack() {
    this.router.navigate(['/board-class-selection']);
  }
}
