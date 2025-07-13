import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss'
})
export class BottomNavComponent {
  reloadApp() {
    if ('caches' in globalThis) {
      caches
        .keys()
        .then(keys => Promise.all(keys.map(k => caches.delete(k))))
        .finally(() => globalThis.location.reload());
    } else {
      globalThis.location.reload();
    }
  }
}
