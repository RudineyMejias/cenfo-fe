import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmPasswordValidator } from '@/shared/validators/confirm-password.validator';
import { UserService } from '@/core/services/user.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'cf-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: ConfirmPasswordValidator('password', 'confirmPassword')
    });
  }

  async onSubmit(e: Event): Promise<void> {
    e.stopPropagation();
    e.preventDefault();
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.loadingService.startLoading();
    try {
      await this.userService.saveUser(this.formGroup.value).toPromise();
      this.router.navigateByUrl('/feed');
    } catch (e) {
      this.toastrService.error(e?.error?.message);
    }
    this.loadingService.stopLoading();
  }

}
