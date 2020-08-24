import { Injectable } from '@angular/core';
import { RequestService } from '@/core/services/request.service';
import { Credentials } from '@/shared/models/credentials.model';
import { User } from '@/shared/models/user.model';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageKeys } from '@/shared/constants/local-storage-keys.constant';
import { Authorization } from '@/shared/models/authorization.model';

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
    return this.requestService.post<Authorization>('/login', credentials)
      .pipe(map((data) => this.saveUserSession(data)));
  }

  logout(): void {
    localStorage.removeItem(LocalStorageKeys.AUTH);
    this.isAuthenticatedSubject.next(false);
    this.authenticatedUserSubject.next(undefined);
  }

  saveUserSession(session: Authorization): void {
    localStorage.setItem(LocalStorageKeys.AUTH, JSON.stringify(session));
    this.isAuthenticatedSubject.next(true);
    this.authenticatedUserSubject.next(session.user);
  }
}
