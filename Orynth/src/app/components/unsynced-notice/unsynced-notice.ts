import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-unsynced-notice',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './unsynced-notice.html',
  styleUrl: './unsynced-notice.scss'
})
export class UnsyncedNoticeComponent {
  show = false;
  constructor(private auth: Auth, private authService: AuthService) {
    this.authService.authState$.subscribe(u => {
      this.show = !u || u.isAnonymous;
    });
  }
}
