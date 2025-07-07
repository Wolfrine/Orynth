import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'Orynth';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.signInAnonymouslyIfNeeded();
  }
}
