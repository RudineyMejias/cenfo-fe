import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cf-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.formGroup.invalid) {
      this.formGroup.markAsDirty();
      return;
    }

    try {
      await this.authenticationService.login(this.formGroup.value).toPromise();
    } catch (e) {
      console.log(e);
      this.toastrService.error(e?.message);
    }
  }
}
