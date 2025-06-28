import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../../components/chip/chip';

@Component({
  selector: 'app-chapter-tracker-page',
  imports: [CommonModule, RouterModule, ChipComponent],
  templateUrl: './chapter-tracker-page.html',
  styleUrl: './chapter-tracker-page.scss'
})
export class ChapterTrackerPageComponent {

  chapters = [
    { id: 1, name: 'Chapter 1', status: 'pending', confidence: 0 },
    { id: 2, name: 'Chapter 2', status: 'in-progress', confidence: 50 },
    { id: 3, name: 'Chapter 3', status: 'done', confidence: 80 }
  ];
}
