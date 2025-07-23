import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.scss',
  standalone: false
})
export class User {

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/user/${path}`]);
  }


  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
