import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../../shared/models/trip.model';
import { Auth } from '../../shared/services/auth';
import { Earning } from '../../shared/models/earning.model';


@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAssignedTrips(): Observable<Trip[]> {
    const driverId = sessionStorage.getItem('userId');
    if (!driverId) {
    throw new Error('Driver ID not found in sessionStorage');
  }
    const params = new HttpParams().set('driverId', driverId);
    return this.http.get<Trip[]>(`${this.baseUrl}/driver/assigned`, { params });
  }

  completeTrip(tripId: number): Observable<any> {
    const now = new Date();
    const dropTime =  now.toISOString().slice(0, 19); // "HH:mm"

    const params = new HttpParams()
      .set('bookingId', tripId.toString())
      .set('dropTime', dropTime);

    return this.http.post(`${this.baseUrl}/driver/complete`, null, { params, responseType: 'text' });
  }

  getTrips(driverId: number): Observable<Earning[]> {
    const params = new HttpParams().set('driverId', driverId);
    return this.http.get<Earning[]>(`${this.baseUrl}/driver/completed`, { params });
  }

}
