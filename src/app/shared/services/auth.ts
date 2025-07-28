import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private base_url = `${environment.baseUrl}/auth`;
  private decodedToken: any;

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('token');
    console.log(token);
  }

  login(data: any) {
    return this.http.post(`${this.base_url}/login`, data);
  }

}
