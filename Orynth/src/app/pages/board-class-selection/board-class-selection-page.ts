import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-board-class-selection-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './board-class-selection-page.html'
})
export class BoardClassSelectionPageComponent {
  step: 1 | 2 = 1;
  selectedBoard = '';
  selectedClass = '';
  boards = [
    { id: 'cbse', name: 'CBSE', description: 'Central Board of Secondary Education' },
    { id: 'icse', name: 'ICSE', description: 'Indian Certificate of Secondary Education' },
    { id: 'state', name: 'State Board', description: 'State Government Board' }
  ];
  classes = ['6', '7', '8', '9', '10', '11', '12'];

  constructor(private router: Router, private appState: AppStateService) {}

  startLearning() {
    this.appState.setBoard(this.selectedBoard);
    this.appState.setStandard(this.selectedClass);
    this.router.navigate(['/subject-list']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
