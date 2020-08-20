import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '@/core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@/core/services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cf-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly toastrService: ToastrService,
    private readonly loadingService: LoadingService,
    private readonly router: Router
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

    this.loadingService.startLoading();
    try {
      await this.authenticationService.login(this.formGroup.value).toPromise();
      this.loadingService.stopLoading();
      this.router.navigateByUrl('/feed');
    } catch (e) {
      this.toastrService.error(e?.error?.message);
      this.loadingService.stopLoading();
    }
  }
}
