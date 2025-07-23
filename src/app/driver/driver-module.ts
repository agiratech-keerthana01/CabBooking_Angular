import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverRoutingModule } from './driver-routing-module';
import { Driver } from './driver';
import { RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [Driver],
  imports: [
    CommonModule,
    DriverRoutingModule,
    RouterOutlet
  ]
})
export class DriverModule { }
