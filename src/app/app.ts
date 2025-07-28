import { Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { Unauthorized } from './shared/components/unauthorized/unauthorized';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSnackBarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'cab-booking';
}
