import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@/shared/models/user.model';
import { RequestService } from './request.service';
import { LocalStorageKeys } from '@/shared/constants/local-storage-keys.constant';
import { AuthenticationService } from '@/core/services/authentication.service';
import { Authorization } from '@/shared/models/authorization.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly basePath = '/users';

  private readonly userSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem(LocalStorageKeys.AUTH) || null)?.user
  );

  get user$(): Observable<User> {
    return this.userSubject.asObservable();
  }

  constructor(
    private readonly requestService: RequestService,
    private readonly authenticationService: AuthenticationService
  ) { }

  saveUser(user: User): Observable<void> {
    return this.requestService.post<Authorization>(this.basePath, user)
      .pipe(map((data) => this.authenticationService.saveUserSession(data)));
  }

  getUser(userId: number): Observable<User> {
    return this.requestService.get<User>(`${this.basePath}/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.requestService.get<User[]>(this.basePath);
  }

  updateUser(user: User): Observable<User> {
    return this.requestService.post<User>(`${this.basePath}`, user);
  }
}
