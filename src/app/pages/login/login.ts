import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../core/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  enterDashboard(): void {
    const loggedIn = this.auth.login('demo@lymanhs.com', 'portfolio-demo');

    if (loggedIn) {
      this.router.navigateByUrl('/app/dashboard');
    }
  }
}
