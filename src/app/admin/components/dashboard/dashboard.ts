import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  role = 'Admin';

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
