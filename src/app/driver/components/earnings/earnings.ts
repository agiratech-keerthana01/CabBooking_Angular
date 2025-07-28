import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Earning } from '../../../shared/models/earning.model';
import { DriverService } from '../../services/driver-service';


@Component({
  selector: 'app-earnings',
  standalone: false,
  templateUrl: './earnings.html',
  styleUrl: './earnings.scss',
})
export class Earnings implements OnInit {
  driverId!: number;
  allTrips: Earning[] = [];
  filteredTrips: Earning[] = [];
  totalTrips = 0;
  totalEarnings = 0;

  constructor(
    private driverService: DriverService,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    const idFromStorage = sessionStorage.getItem('userId');
    const role = sessionStorage.getItem('userId');
    this.driverId = idFromStorage ? +idFromStorage : 0;
    console.log('User ID:', this.driverId, 'Role:', role);

    if (this.driverId) {
      this.driverService.getTrips(this.driverId).subscribe((trips) => {
        console.log('fetched: ', trips);
        this.allTrips = trips;
        this.applyFilter('DAY');
        this.cdRef.detectChanges();
      });
    } else {
      console.error('Driver ID could not be determined from token.');
    }
  }

  applyFilter(duration: 'DAY' | 'WEEK' | 'MONTH'): void {
  const now = new Date();
  let startDate: Date;

  switch (duration) {
    case 'DAY':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // today at 00:00
      break;
    case 'WEEK':
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'MONTH':
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 1);
      startDate.setHours(0, 0, 0, 0);
      break;
    default:
      startDate = new Date('2000-01-01');
  }

  this.filteredTrips = this.allTrips.filter((trip) => {
    const dropTime = new Date(trip.dropTime);
    return dropTime >= startDate;
  });

  this.totalTrips = this.filteredTrips.length;
  this.totalEarnings = this.filteredTrips.reduce((sum, trip) => sum + trip.amount, 0);
}
}
