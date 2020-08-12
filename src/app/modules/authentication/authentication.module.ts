import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from '@/authentication/authentication-routing.module';
import { LoginComponent } from '@/authentication/components/login/login.component';
import { SharedModule } from '@/shared/shared.module';
import { SigninFormComponent } from '@/authentication/components/signin-form/signin-form.component';
import { SignupFormComponent } from '@/authentication/components/signup-form/signup-form.component';


@NgModule({
  declarations: [
    LoginComponent,
    SigninFormComponent,
    SignupFormComponent,
  ],
  imports: [
    AuthenticationRoutingModule,
    SharedModule,
  ]
})
export class AuthenticationModule { }
