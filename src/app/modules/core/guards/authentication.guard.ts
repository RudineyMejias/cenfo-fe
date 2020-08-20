import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@/core/services/authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const { onlyUnauthenticated = false } = next.data;
    return this.authenticationService.isAuthenticated$.pipe(
      map(
        (isAuthenticated) => {
          const canActivate = (isAuthenticated !== onlyUnauthenticated);
          const redirectRoute = onlyUnauthenticated ? '/feed' : '/login';

          return canActivate || !this.router.navigateByUrl(redirectRoute);
        }
      )
    );
  }
}
