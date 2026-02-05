import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AppLayout } from './layout/app-layout/app-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { StudentsList } from './pages/students-list/students-list';
import { StudentProfile } from './pages/student-profile/student-profile';
import { authGuard } from './core/auth/auth-guard';

import { loginRedirectGuard } from './core/auth/login-redirect.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login', component: Login, canActivate: [loginRedirectGuard] },

  {
    path: 'app',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: Dashboard },
      { path: 'students', component: StudentsList },
      { path: 'students/:id', component: StudentProfile },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
