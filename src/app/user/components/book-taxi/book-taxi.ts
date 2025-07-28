import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-taxi',
  standalone: false,
  templateUrl: './book-taxi.html',
  styleUrl: './book-taxi.scss',
})
export class BookTaxi implements OnInit {
  bookForm!: FormGroup;
  points: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  pickupTime: string = '';
  fareDisplay: string = '';
  errorMsg: string = '';
  successMsg: string = '';
  latestBookingId!: number;
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      pickupPoint: ['', Validators.required],
      dropPoint: ['', Validators.required],
    });

    const now = new Date();
    this.pickupTime = now.toTimeString().split(' ')[0].slice(0, 5);

    this.bookForm.valueChanges.subscribe(() => this.fetchFare());
  }

  fetchFare(): void {
    const pickup = this.bookForm.get('pickupPoint')?.value;
    const drop = this.bookForm.get('dropPoint')?.value;

    this.errorMsg = '';
    this.fareDisplay = '';

    if (!pickup || !drop || pickup === drop) return;

    this.userService.getFare(pickup, drop).subscribe({
      next: (fare) => (this.fareDisplay = `₹ ${fare}`),
      error: () => {
        this.errorMsg = 'Failed to estimate fare';
        this.fareDisplay = 'Error';
      },
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) return;

    const { pickupPoint, dropPoint } = this.bookForm.value;

    this.userService.bookTaxi(pickupPoint, dropPoint).subscribe({
      next: (msg: any) => {
        console.log('Backend response:', msg);
        console.log('msg.message:', msg.message, typeof msg.message);

        this.successMsg = msg;
        this.latestBookingId = 0;

        this.isSuccess = true;
        this.cdRef.detectChanges();
      },

      error: (err) => {
        this.errorMsg = typeof err.error === 'string' ? err.error : 'Booking failed';
      },
    });
  }

  handleBack(): void {
    this.isSuccess = false;
    this.successMsg = '';
    this.latestBookingId = 0;
    this.bookForm.reset();
    this.fareDisplay = '';
  }
}
