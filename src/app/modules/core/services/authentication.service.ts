import { Injectable } from '@angular/core';
import { RequestService } from '@/core/services/request.service';
import { Credentials } from '@/shared/models/credentials.model';
import { User } from '@/shared/models/user.model';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { LocalStorageKeys } from '@/shared/constants/local-storage-keys.constant';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticatedSubject = new BehaviorSubject(!!localStorage.getItem(LocalStorageKeys.TOKEN));

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  constructor(
    private readonly requestService: RequestService,
    private readonly router: Router,
    private readonly translateService: TranslateService
  ) { }

  login(credentials: Credentials): Observable<void> {
    if (credentials.email !== environment.validEmail || credentials.password !== environment.validPassword) {
      return this.translateService.get('ERRORS.INVALID_CREDENTIALS')
        .pipe(mergeMap((message) => throwError({ message })));
    }
    return this.requestService.get<{ token: string, user: User }>('/login')
      .pipe(map((data) => {
        localStorage.setItem(LocalStorageKeys.TOKEN, data.token);
        this.router.navigateByUrl('/feed');
      }));
  }

  logout(): void {
    localStorage.removeItem(LocalStorageKeys.TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigateByUrl('/login');
  }
}
