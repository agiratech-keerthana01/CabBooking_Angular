import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverRoutingModule } from './driver-routing-module';
import { Driver } from './driver';
import { RouterOutlet } from '@angular/router';
import { Assigned } from './components/assigned/assigned';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TimeformatPipe } from '../shared/pipes/timeformat-pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Earnings } from './components/earnings/earnings';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CompletedTrips } from './components/completed-trips/completed-trips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [Driver, Assigned, Earnings, CompletedTrips],
  imports: [
    TimeformatPipe,
    CommonModule,
    DriverRoutingModule,
    RouterOutlet,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    
  ]
})
export class DriverModule { }
