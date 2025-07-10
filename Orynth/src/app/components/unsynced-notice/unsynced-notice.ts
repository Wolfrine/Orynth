import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-unsynced-notice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unsynced-notice.html',
  styleUrl: './unsynced-notice.scss'
})
export class UnsyncedNoticeComponent {
  show = false;
  constructor(private auth: Auth, private authService: AuthService) {
    this.authService.authState$.subscribe(u => {
      this.show = !u;
    });
  }
}
