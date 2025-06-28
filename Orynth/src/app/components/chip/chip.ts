import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chip',
  imports: [CommonModule],
  templateUrl: './chip.html',
  styleUrl: './chip.scss'
})
export class ChipComponent {

  @Input() color: 'done' | 'in-progress' | 'pending' | 'default' | string = 'default';
  @Input() label = '';
}
