import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-booking-success',
  standalone: false,
  templateUrl: './booking-success.html',
  styleUrl: './booking-success.scss',
})
export class BookingSuccess implements OnInit {
  @Input() message!: string;
  @Input() bookingId!: number;
  @Output() back = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  goBack(): void {
    this.back.emit(); // notify parent to switch back
  }
}
