import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Driver } from '../../../shared/models/driver.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from '../../services/admin-service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog.component/edit-user-dialog.component';
import { EditDriverDialogComponent } from '../edit-driver-dialog.component/edit-driver-dialog.component';

@Component({
  selector: 'app-view-drivers',
  standalone: false,
  templateUrl: './view-drivers.html',
  styleUrl: './view-drivers.scss'
})
export class ViewDrivers implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'email', 'cabNumber', 'actions'];
  dataSource = new MatTableDataSource<Driver>();
  totalUsers = 0;
  page = 0;
  pageSize = 5;
  searchQuery = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDrivers();
  }


  loadDrivers(): void {
      this.adminService
        .getDrivers(this.page, this.pageSize, this.searchQuery)
        .subscribe((data) => {
          console.log('API Response:', data);
          this.dataSource = new MatTableDataSource<Driver>(data); // If API returns array directly
          this.dataSource.paginator = this.paginator;
          this.cdRef.detectChanges();
        });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDrivers();
  }

  openEditDialog(driver: Driver): void {
    const dialogRef = this.dialog.open(EditDriverDialogComponent, {
      width: '400px',
      data: { ...driver},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadDrivers();
    });
  }

  deleteDriver(id: number): void {
    console.log('Deleting the driver with id:', id);
    if(confirm('Are you sure, you want to delete this driver?')){
      this.adminService.deleteDriver(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(
            (driver) => driver.id !== id
          );
        },
        error: (err) => {
          console.log('Delete failed', err);
        }
      });
    }
  }

}
