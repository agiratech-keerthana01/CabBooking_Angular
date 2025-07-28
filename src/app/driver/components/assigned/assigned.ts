import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';
import { DriverService } from '../../services/driver-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assigned',
  standalone: false,
  templateUrl: './assigned.html',
  styleUrl: './assigned.scss',
})
export class Assigned implements OnInit {
  assignedTrips: Trip[] = [];
  message: string = '';

  constructor(
    private driverService: DriverService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadAssignedTrips();
  }

  loadAssignedTrips(): void {
    this.driverService.getAssignedTrips().subscribe({
      next: (trips: Trip[]) => {
        console.log('fetched: ', trips);
        this.assignedTrips = trips;
        this.cdRef.detectChanges();
      },
      error: () => {
        this.message = 'Failed to load trips';
      },
    });
  }

  completeTrip(tripId: number): void {
    this.driverService.completeTrip(tripId).subscribe({
      next: () => {
        this.snackBar.open('Trip completed successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });
        this.loadAssignedTrips();
      },
      error: () => {
        this.snackBar.open('Failed to complete the trip.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}
