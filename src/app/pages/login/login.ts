import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  error = '';

  form;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit(): void {
    this.error = '';
    if (this.form.invalid) {
      this.error = 'Enter a valid email and password.';
      return;
    }

    const ok = this.auth.login(this.form.value.email ?? '', this.form.value.password ?? '');

    if (!ok) {
      this.error = 'Login failed.';
      return;
    }

    this.router.navigateByUrl('/app/dashboard');
  }
}
