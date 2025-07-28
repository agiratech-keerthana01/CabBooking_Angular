import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DriverService } from '../../services/driver-service';

@Component({
  selector: 'app-completed-trips',
  standalone: false,
  templateUrl: './completed-trips.html',
  styleUrl: './completed-trips.scss',
})
export class CompletedTrips implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'pickupPoint',
    'dropPoint',
    'pickupTime',
    'dropTime',
    'amount',
    'status',
  ];
  dataSource = new MatTableDataSource();
  errorMsg = '';
  filterValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.loadCompleted();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCompleted(): void {
    const driverIdStr = sessionStorage.getItem('userId');
    const driverId = driverIdStr ? parseInt(driverIdStr, 10) : null;

    if (driverId === null || isNaN(driverId)) {
      this.errorMsg = 'Invalid driver ID';
      return;
    }
  
    this.driverService.getTrips(driverId).subscribe({
      next: (res: any) => {
        console.log('compeleted trips: ', res);
        this.dataSource.data = res;
        this.errorMsg = '';
      },
      error: (err: any) => {
        this.errorMsg =
          typeof err.error === 'string'
            ? err.error
            : 'Failed to load completed trips.';
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
