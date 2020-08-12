import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmPasswordValidator } from '@/shared/validators/confirm-password.validator';

@Component({
  selector: 'cf-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { }

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

  onSubmit(): void {
    if (this.formGroup.valid) {

      return;
    }
    this.formGroup.markAllAsTouched();
  }

}
