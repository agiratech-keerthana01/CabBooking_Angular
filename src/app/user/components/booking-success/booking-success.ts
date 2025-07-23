import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-booking-success',
  standalone: false,
  templateUrl: './booking-success.html',
  styleUrl: './booking-success.scss'
})
export class BookingSuccess implements OnInit{
  @Input() message!: string;
  @Input() bookingId!: number;
  @Output() back = new EventEmitter<void>();

  driverName: string = '';
  cabNumber: string = '';
  cancelForm!: FormGroup;
  cancelMsg: string = '';
  cancelError: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private userService: UserService) {}


  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = history.state as { message?: string; bookingId?: number };

    this.message = state?.message || "NO booking message received.";
    this.bookingId = state?.bookingId ?? 0;

    this.cancelForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  cancelBooking(): void {
    if (this.cancelForm.invalid) return;

    const reason = this.cancelForm.value.reason;
    this.userService.cancelBooking(this.bookingId, reason).subscribe({
      next: (msg) => {
        this.cancelMsg = msg;
        this.cancelError = '';
      },
      error: (err) => {
        this.cancelError = err.error || 'Cancel failed';
        this.cancelMsg = '';
      }
    });
  }

   goBack(): void {
    this.back.emit(); // notify parent to switch back
  }
}

