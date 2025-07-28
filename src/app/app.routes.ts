import { Routes } from '@angular/router';
import { Login } from './shared/components/login/login';
import { authGuard } from './shared/auth-guard';
import { NotFound } from './shared/components/not-found/not-found';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: Login},
    {path: 'admin', loadChildren: () => import('./admin/admin-module').then((m) => m.AdminModule), canActivate: [authGuard]},
    {path: 'user', loadChildren: () => import('./user/user-module').then((m) => m.UserModule), canActivate: [authGuard]},
    {path: 'driver', loadChildren: () => import('./driver/driver-module').then((m) => m.DriverModule), canActivate: [authGuard]},
    {path: 'unauthorized', loadComponent: () => import('./shared/components/unauthorized/unauthorized').then((m) => m.Unauthorized)},
    {path: 'not-found', component: NotFound},
    {path: '**', redirectTo: 'not-found'}

];
