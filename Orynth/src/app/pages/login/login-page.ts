import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPageComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.authState$.subscribe(user => {
      if (user && !user.isAnonymous) {
        this.router.navigate(['/subject-list']);
      }
    });
  }

  async loginWithGoogle() {
    await this.auth.upgradeWithGoogle();
    await this.router.navigate(['/subject-list']);
  }
}
