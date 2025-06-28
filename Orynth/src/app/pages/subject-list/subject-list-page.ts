import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';

@Component({
  selector: 'app-subject-list-page',
  imports: [CommonModule, RouterModule, CardComponent, ProgressBarComponent],
  templateUrl: './subject-list-page.html',
  styleUrl: './subject-list-page.scss'
})
export class SubjectListPageComponent {

  subjects = [
    { id: 1, name: 'Math', progress: 68 },
    { id: 2, name: 'Science', progress: 45 },
    { id: 3, name: 'History', progress: 20 }
  ];
}
