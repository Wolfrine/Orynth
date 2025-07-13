import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { LogService, LogEntry } from '../../services/log.service';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logs-page',
  standalone: true,
  imports: [CommonModule, MatListModule, BottomNavComponent],
  templateUrl: './logs-page.html',
  styleUrl: './logs-page.scss'
})
export class LogsPageComponent {
  logs$!: Observable<LogEntry[]>;

  constructor(private router: Router, private logService: LogService) {
    this.logs$ = this.logService.logs$;
  }

  goBack() {
    this.router.navigate(['/subject-list']);
  }
}
