import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getFare(pickup: string, drop: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/user/estimate?pickup=${pickup}&drop=${drop}`, {responseType: 'text'});
  }

   bookTaxi(pickupPoint: string, dropPoint: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/user/book`, { pickupPoint, dropPoint }, { responseType: 'text' });
  }

  cancelBooking(bookingId: number, reason: string): Observable<string> {
    return this.http.put(`${this.baseUrl}/user/cancel/${bookingId}`, { reason }, { responseType: 'text' });
  }


  getUserBookings() {
    return this.http.get(`${this.baseUrl}/user/user-bookings`);
  }
 
  
}
