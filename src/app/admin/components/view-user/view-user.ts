import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { AdminService } from '../../services/admin-service';
import { EditUserDialogComponent } from '../edit-user-dialog.component/edit-user-dialog.component';

@Component({
  selector: 'app-view-user',
  standalone: false,
  templateUrl: './view-user.html',
  styleUrls: ['./view-user.scss'],
})
export class ViewUser implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();
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
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService
      .getUsers(this.page, this.pageSize, this.searchQuery)
      .subscribe((data) => {
        console.log('API Response:', data);
        this.dataSource = new MatTableDataSource<User>(data); // If API returns array directly
        this.dataSource.paginator = this.paginator;
        this.cdRef.detectChanges();
      });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  search(): void {
    this.page = 0;
    this.loadUsers();
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadUsers();
    });
  }


  deleteUser(id: number): void {
    console.log('Deleting user with id:', id);
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(
            (user) => user.id !== id
          );
        },
        error: (err) => {
          console.error('Delete failed', err);
        },
      });
    }
  }
}
