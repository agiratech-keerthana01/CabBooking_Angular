import { Routes } from '@angular/router';
import { Login } from './shared/components/login/login';

export const routes: Routes = [

    {path: 'login', component: Login},
    {path: 'admin', loadChildren: () => import('./admin/admin-module').then((m) => m.AdminModule)},
    {path: 'user', loadChildren: () => import('./user/user-module').then((m) => m.UserModule)},
    {path: 'driver', loadChildren: () => import('./driver/driver-module').then((m) => m.DriverModule)},

];
