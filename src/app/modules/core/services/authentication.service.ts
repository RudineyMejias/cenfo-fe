import { Injectable } from '@angular/core';
import { RequestService } from '@/core/services/request.service';
import { Credentials } from '@/shared/models/credentials.model';
import { User } from '@/shared/models/user.model';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { LocalStorageKeys } from '@/shared/constants/local-storage-keys.constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!localStorage.getItem(LocalStorageKeys.AUTH));
  private authenticatedUserSubject = new BehaviorSubject<User>(localStorage.getItem(
    LocalStorageKeys.AUTH) &&
    JSON.parse(localStorage.getItem(LocalStorageKeys.AUTH))?.user);

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get authenticatedUser$(): Observable<User> {
    return this.authenticatedUserSubject.asObservable();
  }

  constructor(private readonly requestService: RequestService) { }

  login(credentials: Credentials): Observable<void> {
    return this.requestService.post<{ token: string, user: User }>('/login', credentials)
      .pipe(map((data) => {
        localStorage.setItem(LocalStorageKeys.AUTH, JSON.stringify(data));
        this.isAuthenticatedSubject.next(true);
      }));
  }

  logout(): void {
    localStorage.removeItem(LocalStorageKeys.AUTH);
    this.isAuthenticatedSubject.next(false);
    this.authenticatedUserSubject.next(undefined);
  }
}
