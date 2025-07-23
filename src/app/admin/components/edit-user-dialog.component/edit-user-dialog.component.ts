import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-edit-user-dialog.component',
  standalone: false,
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss'
})
export class EditUserDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.form = this.fb.group({
      username: [data.username, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      role: [data.role, Validators.required],
    });
  }

  onSaveUser() {
    if (this.form.valid) {
      this.adminService.updateUser(this.data.id, this.form.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
