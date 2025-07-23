import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit{

  loginForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please fill in all fields correctly', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    console.log('Login form values:', this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        
        localStorage.setItem('token', res.token);
        const tokenPayload = JSON.parse(atob(res.token.split('.')[1]));
        const role = tokenPayload.role;
        console.log(role);

        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'CUSTOMER') {
          this.router.navigate(['/user']);
        } else if (role === 'DRIVER') {
          this.router.navigate(['/drive']);
        } else {
          this.router.navigate(['/unauthorized']);
        }
      },
      error: (err) => {
        this.snackBar.open('Login failed. Check credentials.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
    });
  }

}
