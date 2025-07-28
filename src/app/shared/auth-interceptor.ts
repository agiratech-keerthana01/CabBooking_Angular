import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, EMPTY, throwError } from 'rxjs';
import { environment } from '../environments/environment';

//here we use inject() because, it is a functional interceptor. NOT class-based interceptor(@Injectable)

export const authInterceptor: HttpInterceptorFn = (req, next) => {



  const token = sessionStorage.getItem('token');
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);


  // Skip adding token for login or register requests
  if (req.url.endsWith('/login') || req.url.endsWith('/register')) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });


  return next(cloned).pipe(
    catchError((error: any) => {
      if (error.status === 500 && error.error?.message?.includes('expired')) {
        snackBar.open('Session expired. Please login again.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
        sessionStorage.removeItem('token');
        router.navigate(['/login']);
        return EMPTY;
      } else if (error.status === 401) {
        snackBar.open('Unauthorized access. Please login.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        router.navigate(['/login']);
        return EMPTY; 
      }
      return throwError(() => error);
    })
  )
};
