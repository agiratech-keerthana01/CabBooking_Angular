import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-edit-driver-dialog.component',
  standalone: false,
  templateUrl: './edit-driver-dialog.component.html',
  styleUrl: './edit-driver-dialog.component.scss'
})
export class EditDriverDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDriverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      cabNumber: [data.cabNumber, Validators.required],
    });
  }


  onSaveDriver() {
    if (this.form.valid) {
      this.adminService.updateDriver(this.data.id, this.form.value).subscribe(() => {
        this.dialogRef.close(true);
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
