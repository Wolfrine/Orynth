import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button';

@Component({
  selector: 'app-board-class-selection-page',
  imports: [FormsModule, RouterModule, ButtonComponent],
  templateUrl: './board-class-selection-page.html',
  styleUrl: './board-class-selection-page.scss'
})
export class BoardClassSelectionPageComponent {

  board = 'CBSE';
  clazz = 6;
  classes = [6, 7, 8, 9, 10, 11, 12];
}
