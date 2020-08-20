import { Component } from '@angular/core';
import { AuthenticationService } from '@/core/services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  get isAuthenticated$(): Observable<boolean> {
    return this.authenticationService.isAuthenticated$;
  }

  constructor(private readonly authenticationService: AuthenticationService) { }
}
