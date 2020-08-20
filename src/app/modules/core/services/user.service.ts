import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@/shared/models/user.model';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private get basePath(): string {
    return '/user';
  }

  private readonly userSubject = new BehaviorSubject(undefined);

  get user$(): Observable<User> {
    return this.userSubject.asObservable();
  }

  constructor(private readonly requestService: RequestService) { }

  getUser(userId: number): Observable<User> {
    return this.requestService.get<User>(`${this.basePath}/${userId}`);
  }

  updateUser(user: User): Observable<User> {
    return this.requestService.post<User>(`${this.basePath}`, user);
  }
}
