// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-app-layout',
//   imports: [],
//   templateUrl: './app-layout.html',
//   styleUrl: './app-layout.scss',
// })
// export class AppLayout {

// }
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../core/auth/auth';
import { signal } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayout {
  constructor(private auth: Auth, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  sidebarOpen = signal(false);

  toggleSidebar() {
    this.sidebarOpen.update((v) => !v);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }
}
