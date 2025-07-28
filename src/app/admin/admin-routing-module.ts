import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Register } from './components/register/register';
import { ViewUser } from './components/view-user/view-user';
import { Dashboard } from './components/dashboard/dashboard';
import { ViewDrivers } from './components/view-drivers/view-drivers';
import { Admin } from './admin';


const routes: Routes = [

  {
    path: '',
    component: Admin,
    children: [
      { path: '', component: Dashboard },
      { path: 'register', component: Register },
      { path: 'user-list', component: ViewUser },
      { path: 'driver-list', component: ViewDrivers },
      
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
