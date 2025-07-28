import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Register } from './components/register/register';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewUser } from './components/view-user/view-user';
import { EditUserDialogComponent } from './components/edit-user-dialog.component/edit-user-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { Dashboard } from './components/dashboard/dashboard';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { ViewBooking } from './components/view-booking/view-booking';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TimeformatPipe } from '../shared/pipes/timeformat-pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ViewDrivers } from './components/view-drivers/view-drivers';
import { EditDriverDialogComponent } from './components/edit-driver-dialog.component/edit-driver-dialog.component';
import { RouterOutlet } from '@angular/router';
import { Admin } from './admin';



@NgModule({
  declarations: [Register, ViewUser, EditUserDialogComponent, EditDriverDialogComponent,
    Dashboard, ViewBooking, ViewDrivers, Admin],
  imports: [
    TimeformatPipe,
    RouterOutlet,
    CommonModule,
    AdminRoutingModule, //routing
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatDividerModule,
    MatCardModule,
    MatToolbarModule,
    MatDatepickerModule,
  ],
  exports: [Register]
})
export class AdminModule { }
