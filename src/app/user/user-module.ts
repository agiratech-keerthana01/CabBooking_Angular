import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing-module';
import { BookTaxi } from './components/book-taxi/book-taxi';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingSuccess } from './components/booking-success/booking-success';
import { RouterOutlet } from '@angular/router';
import { User } from './user';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewBookings } from './components/view-bookings/view-bookings';
import { TimeformatPipe } from '../shared/pipes/timeformat-pipe';



@NgModule({
  declarations: [BookTaxi, BookingSuccess, User, ViewBookings],
  imports: [
    CommonModule,
    UserRoutingModule,
    TimeformatPipe,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    RouterOutlet,
  ]
})
export class UserModule { }
