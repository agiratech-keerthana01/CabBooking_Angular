import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Driver } from './driver';



const routes: Routes = [

  {
    path: '',
    component: Driver,
    children: [
      
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
