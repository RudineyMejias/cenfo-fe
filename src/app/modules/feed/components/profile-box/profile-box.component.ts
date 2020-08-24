import { Component } from '@angular/core';
import { AuthenticationService } from '@/core/services/authentication.service';
import { Observable } from 'rxjs';
import { User } from '@/modules/shared/models/user.model';

@Component({
  selector: 'cf-profile-box',
  templateUrl: './profile-box.component.html',
  styleUrls: ['./profile-box.component.scss']
})
export class ProfileBoxComponent {

  get user$(): Observable<User> {
    return this.authenticationService.authenticatedUser$;
  }

  constructor(private readonly authenticationService: AuthenticationService) { }

}
