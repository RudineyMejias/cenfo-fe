import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageKeys } from '@/shared/constants/local-storage-keys.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

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
          localStorage.removeItem(LocalStorageKeys.AUTH);
          location.href = '/login';
        }
        return throwError(err);
      })
    );
  }
}
