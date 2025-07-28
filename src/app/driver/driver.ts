import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  standalone: false,
  templateUrl: './driver.html',
  styleUrl: './driver.scss'
})
export class Driver {

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/driver/${path}`]);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
