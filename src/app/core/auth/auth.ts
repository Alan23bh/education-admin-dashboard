import { Injectable } from '@angular/core';

type Role = 'teacher' | 'admin';

@Injectable({ providedIn: 'root' })
export class Auth {
  private tokenKey = 'td_token';
  private roleKey = 'td_role';

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(email: string, password: string): boolean {
    if (!email.trim() || !password.trim()) return false;

    localStorage.setItem(this.tokenKey, 'fake-token');
    localStorage.setItem(this.roleKey, 'teacher'); // later you can support admin
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }

  getRole(): Role | null {
    return (localStorage.getItem(this.roleKey) as Role) ?? null;
  }
}
