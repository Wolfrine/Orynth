import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subject-progress-ring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject-progress-ring.html',
  styleUrl: './subject-progress-ring.scss'
})
export class SubjectProgressRingComponent {

  @Input() value = 0;
}
