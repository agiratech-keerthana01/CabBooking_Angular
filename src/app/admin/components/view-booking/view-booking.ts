import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-view-booking',
  standalone: false,
  templateUrl: './view-booking.html',
  styleUrl: './view-booking.scss',
  providers: [DatePipe]
})
export class ViewBooking implements OnInit {

  allBookings: any[] = [];
  filteredBookings: any[] = [];
  paginatedBookings: any[] = [];
  pageSize = 5;
  currentPage = 0;
  filterForm!: FormGroup;

  displayedColumns = ['id', 'employeeName', 'driverName', 'fromLocation', 'toLocation', 'pickupTime', 'dropTime', 'fare'];

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      date: [''],
      employee: [''],
      driver: ['']
    });

    this.fetchBookings();

    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.applyFilters();
    });
  }

  fetchBookings(): void {
    this.adminService.getAllBookings({}).subscribe({
      next: (data) => {
        console.log('fetched:', data);
        this.allBookings = (data || []).sort((a: any, b: any) =>
          new Date(b.pickupTime).getTime() - new Date(a.pickupTime).getTime()
        );
        this.applyFilters();
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }

  applyFilters(): void {
    const { date, employee, driver } = this.filterForm.value;

    this.filteredBookings = this.allBookings.filter(b => {
      const matchesDate = !date || this.datePipe.transform(b.createdAt, 'yyyy-MM-dd') === this.datePipe.transform(date, 'yyyy-MM-dd');
      const matchesEmployee = !employee || b.customer?.username?.toLowerCase().includes(employee.toLowerCase());
      const matchesDriver = !driver || b.driver?.name?.toLowerCase().includes(driver.toLowerCase());
      return matchesDate && matchesEmployee && matchesDriver;
    });

    this.currentPage = 0;
    this.updatePaginatedBookings();
  }

  updatePaginatedBookings(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedBookings = this.filteredBookings.slice(start, end);
    this.cdRef.detectChanges();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedBookings();
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.applyFilters();
  }
}
