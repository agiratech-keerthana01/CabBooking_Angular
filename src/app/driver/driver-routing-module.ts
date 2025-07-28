import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Driver } from './driver';
import { Assigned } from './components/assigned/assigned';
import { Earnings } from './components/earnings/earnings';
import { CompletedTrips } from './components/completed-trips/completed-trips';


const routes: Routes = [

  {
    path: '',
    component: Driver,
    children: [
      {path: '', component: Assigned},
      {path: 'earnings', component: Earnings},
      {path: 'completed', component: CompletedTrips}
    ]
  }

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
