import { Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout.component';
import { AllProjectsComponent } from './pages/Projects/Pages/all-projects/all-projects.component';
import { NewsComponent } from './pages/news/news.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { RequestComponent } from './pages/request/request.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'inicio', component: DashboardComponent },
      { path: 'proyectos', component: AllProjectsComponent },
      { path: 'usuarios', component: UsersComponent },
      { path: 'noticias', component: NewsComponent },
      { path: 'solicitudes', component: RequestComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];
