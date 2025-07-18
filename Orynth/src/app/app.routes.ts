import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'onboarding', pathMatch: 'full' },
  {
    path: 'onboarding',
    loadComponent: () => import('./pages/onboarding/onboarding-page').then(m => m.OnboardingPageComponent)
  },
  {
    path: 'board-class-selection',
    loadComponent: () => import('./pages/board-class-selection/board-class-selection-page').then(m => m.BoardClassSelectionPageComponent)
  },
  {
    path: 'subject-list',
    loadComponent: () => import('./pages/subject-list/subject-list-page').then(m => m.SubjectListPageComponent)
  },
  {
    path: 'chapter-tracker',
    loadComponent: () => import('./pages/chapter-tracker/chapter-tracker-page').then(m => m.ChapterTrackerPageComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard-page').then(m => m.DashboardPageComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile-page/profile-page').then(m => m.ProfilePageComponent),
    title: 'Profile'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login-page').then(m => m.LoginPageComponent)
  },
  {
    path: 'firebase-test',
    loadComponent: () => import('./components/firebase-test/firebase-test.component').then(m => m.FirebaseTestComponent)
  },
  {
    path: 'add-test-results',
    loadComponent: () => import('./pages/add-test-results/add-test-results-page').then(m => m.AddTestResultsPageComponent)
  },
  {
    path: 'logs',
    loadComponent: () => import('./pages/logs/logs-page').then(m => m.LogsPageComponent)
  },
];
