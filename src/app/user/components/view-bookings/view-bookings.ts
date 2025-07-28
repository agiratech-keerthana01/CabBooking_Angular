import { AfterViewInit, Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-bookings',
  standalone: false,
  templateUrl: './view-bookings.html',
  styleUrl: './view-bookings.scss'
})
export class ViewBookings implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id', 'pickupPoint', 'dropPoint', 'pickupTime', 'dropTime', 'amount'];
  dataSource = new MatTableDataSource();
  errorMsg = '';
  filterValue = '';  

  //allow to manipulate DOM
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  ngAfterViewInit(): void {
    //connectcs the datasource to pagination and sort
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadBookings(): void {
    this.userService.getUserBookings().subscribe({
      next: (res: any) => {
        console.log('bookings', res);
        this.dataSource.data = res;
        this.errorMsg = '';
      },
      error: (err: any) => {
        this.errorMsg = typeof err.error === 'string' ? err.error : 'Failed to load bookings.';
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
