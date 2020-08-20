import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '@/shared/constants/local-storage-keys.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private readonly router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authData = localStorage.getItem(LocalStorageKeys.AUTH);
    const token = authData && JSON.parse(authData).token;
    let request = req;
    const headers = token ? { authorization: `Bearer ${token}` } : {};

    if (token) {
      request = req.clone({
        setHeaders: {
          ...headers,
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }
        return throwError(err);
      })
    );
  }
}
