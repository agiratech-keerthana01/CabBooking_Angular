import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ViewBooking } from '../components/view-booking/view-booking';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.baseUrl; 

  constructor(private http: HttpClient) {}

  registerUser(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register/user`, payload, { responseType: 'text' });
  }

  registerDriver(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register/driver`, payload, { responseType: 'text' });
  }

  getUsers(page: number, size: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('search', search);
    return this.http.get(`${this.baseUrl}/admin/users`, { params });
  }

  getDrivers(page: number, size: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('search', search);
    return this.http.get(`${this.baseUrl}/admin/drivers`, { params });
  }

   getAllBookings(filters?: {
    date?: string;       // e.g. '2025-07-22'
    employee?: string;
    driver?: string;
  }): Observable<ViewBooking[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.date) params = params.set('date', filters.date);
      if (filters.employee) params = params.set('employee', filters.employee);
      if (filters.driver) params = params.set('driver', filters.driver);
    }
    return this.http.get<ViewBooking[]>(`${this.baseUrl}/user/bookings`, { params });
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/user/${id}`, user, { responseType: 'text' });
  }

  updateDriver(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/driver/${id}`, user, { responseType: 'text' });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/user/${id}`, { responseType: 'text' });
  }

  deleteDriver(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/driver/${id}`, { responseType: 'text' });
  }
  
}
