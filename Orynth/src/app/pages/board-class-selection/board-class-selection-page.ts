import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AppStateService } from '../../services/app-state.service';
import { SyllabusService } from '../../services/syllabus.service';
import { AuthService } from '../../services/auth.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-board-class-selection-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './board-class-selection-page.html'
})
export class BoardClassSelectionPageComponent implements OnInit {
  step: 1 | 2 = 1;
  selectedBoard = '';
  selectedClass = '';
  boards: { id: string; name: string; description?: string }[] = [];
  classes: string[] = [];
  noBoards = false;
  noClasses = false;
  private syllabus: any = {};

  constructor(
    private router: Router,
    private appState: AppStateService,
    private syllabusService: SyllabusService,
    private auth: AuthService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.syllabusService.getSyllabusTree().subscribe(data => {
      this.syllabus = data || {};
      this.boards = Object.keys(this.syllabus).map(id => ({ id, name: id }));
      this.noBoards = this.boards.length === 0;
    });
  }

  nextStep() {
    this.step = 2;
    this.classes = Object.keys(this.syllabus[this.selectedBoard] || {});
    this.noClasses = this.classes.length === 0;
  }

  async startLearning() {
    this.appState.setBoard(this.selectedBoard);
    this.appState.setStandard(this.selectedClass);

    if (this.auth.isLoggedIn()) {
      const uid = this.auth.getCurrentUserId();
      const subjects = Object.keys(this.syllabus[this.selectedBoard]?.[this.selectedClass] || {});
      const progress: any = {};
      subjects.forEach(s => progress[s] = {});
      const ref = doc(this.firestore, `Users/${uid}`);
      await setDoc(ref, {
        profile: {
          board: this.selectedBoard,
          standard: this.selectedClass
        },
        progress: {
          [this.selectedBoard]: {
            [this.selectedClass]: progress
          }
        }
      }, { merge: true });
    }

    this.router.navigate(['/subject-list']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
