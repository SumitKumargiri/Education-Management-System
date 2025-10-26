import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class loginInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.toastr.error('Unauthorized. Please log in again.');
          } else if (error.status === 400) {
            this.toastr.error('Bad Request');
          } else if (error.status === 403) {
            this.toastr.error('Forbidden');
          } else if (error.status === 404) {
            this.toastr.error('Data Not Found');
          } else if (error.status === 500) {
            this.toastr.error('Internal Server Error');
          } else if (error.status === 408) {
            this.toastr.error('Request Timeout');
          } else {
            console.error('Error:', error);
            this.toastr.error('An error occurred. Please try again later.');
          }
          return throwError(error);
        })
      );
    } else {
      this.router.navigate(['/login-form']);
      // this.toastr.error('Token expired');
      return next.handle(req);
    }
  }
}
