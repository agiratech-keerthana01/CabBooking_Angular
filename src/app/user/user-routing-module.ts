import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookTaxi } from './components/book-taxi/book-taxi';
import { User } from './user';
import { ViewBookings } from './components/view-bookings/view-bookings';



const routes: Routes = [

    // {path: 'booking-success', component: BookingSuccess},
    {
      path: '',
      component: User,
      children: [
        {
          path: '',
          component: BookTaxi
        },
        {
          path: 'myBookings',
          component: ViewBookings
        },
       
      ]
    }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
