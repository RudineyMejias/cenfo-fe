import { Component } from '@angular/core';
import { AuthenticationService } from '@/core/services/authentication.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  get authUser$(): Observable<boolean> {
    return this.authenticationService.authenticatedUser$;
  }

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly translateService: TranslateService
  ) { }

  changeLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }

  logout(): void {
    this.authenticationService.logout();
    location.href = '/login';
  }
}
