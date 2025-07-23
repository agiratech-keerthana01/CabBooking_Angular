import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm!: FormGroup;
  passwordStrength = '';
  hidePassword = true;
  selectedRole: string = 'USER';
  passwordValidations = {
    minLength: false,
    upperLowerCase: false,
    specialChar: false,
  };

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        role: ['USER', Validators.required],
        cabNumber: [''],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  onRoleChange(role: string): void {
  this.selectedRole = role;

  const vehicleControl = this.registerForm.get('cabNumber');
  if (role === 'DRIVER') {
    vehicleControl?.setValidators([Validators.required]);
  } else {
    vehicleControl?.clearValidators();
    vehicleControl?.setValue('');
  }
  vehicleControl?.updateValueAndValidity();
}
  checkPasswordStrength(): void {
    const password = this.registerForm.get('password')?.value || '';
    this.passwordValidations.minLength = password.length >= 8;
    this.passwordValidations.upperLowerCase =
      /[a-z]/.test(password) && /[A-Z]/.test(password);
    this.passwordValidations.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(
      password
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
   
    if (this.registerForm.invalid) return;

    const payload: any = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password,
      
    };

    if (this.registerForm.value.role === 'DRIVER') {
      payload.cabNumber = this.registerForm.value.cabNumber;
      this.adminService.registerDriver(payload).subscribe(() => {
        alert('Driver registered successfully!');
        this.registerForm.reset({ role: 'USER' });
        this.passwordStrength = '';
      });
    } else if (this.registerForm.value.role === 'USER'){
      this.adminService.registerUser(payload).subscribe(() => {
        alert('User registered successfully!');
        this.registerForm.reset({ role: 'USER' });
        this.passwordStrength = '';
      });
    } else {
      payload.role = this.registerForm.value.role;
      this.adminService.registerUser(payload).subscribe(() => {
        alert('Admin registered successfully!');
        this.registerForm.reset({ role: 'USER' });
        this.passwordStrength = '';
      });
    }
  }
}
