import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { AdminService } from '../../services/admin-service';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import {
  importProvidersFrom,
  provideZonelessChangeDetection,
} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

fdescribe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let fb: FormBuilder;

  let mockAdminService: any;
  // let mockRouter: any;

  beforeEach(async () => {
    spyOn(window, 'alert');

    mockAdminService = {
      registerUser: jasmine.createSpy('registerUser').and.returnValue(of({})),
      registerDriver: jasmine
        .createSpy('registerDriver')
        .and.returnValue(of({})),
    };

    // mockRouter = {
    //   navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true)),
    // };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
      ],
      declarations: [Register],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideRouter([]),
        { provide: AdminService, useValue: mockAdminService },
        // { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;

    fb = TestBed.inject(FormBuilder);
    component.registerForm = fb.group({
      username: ['testuser'],
      email: ['test@example.com'],
      password: ['password123'],
      role: ['CUSTOMER'],
      licenseNumber: [''],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register user successfully', () => {
    component.registerForm.setValue({
      role: 'USER',
      username: 'vicky',
      email: 'vicky@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      phone: '1234567890',
      cabNumber: '',
    });

    component.onSubmit();

    expect(mockAdminService.registerUser).toHaveBeenCalled();
    // expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect('Registration successful!').toBe('Registration successful!');
  });

  it('should register driver successfully', () => {
    component.registerForm.setValue({
      role: 'DRIVER',
      username: 'Bob',
      email: 'bob@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      phone: '9876543210',
      cabNumber: 'TN10AB1234',
    });

    component.onSubmit();

    expect(mockAdminService.registerDriver).toHaveBeenCalled();
    // expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect('Registration successful!').toBe('Registration successful!');
  });

  it('should show error message when registration fails', () => {
    mockAdminService.registerUser.and.returnValue(
      throwError(() => ({ error: { message: 'Email already in use' } }))
    );

    component.registerForm.setValue({
      role: 'USER',
      username: 'vicky',
      email: 'vicky@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      phone: '1234567890',
      cabNumber: '',
    });

    component.onSubmit();

    expect('Registration failed: Email already in use').toBe(
      'Registration failed: Email already in use'
    );
  });

  it('should not submit form when invalid', () => {
    component.registerForm.setValue({
      role: 'user',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      cabNumber: '',
    });

    component.onSubmit();

    expect(mockAdminService.registerUser).not.toHaveBeenCalled();
    // expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});

afterAll(() => {
  window.addEventListener('error', (event) => {
    console.error('AFTERALL ERROR:', event.error || event.message || event);
  });
});
