import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class Auth {

  private base_url = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  
  login(data: any) {
    return this.http.post(`${this.base_url}/login`, data);
  }
  
}
