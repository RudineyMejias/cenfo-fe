import { Component, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'cf-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() type = 'text';
  value: string;
  isDisabled: boolean;

  get errorMsg(): string {
    if (this.ngControl.invalid) {
      const errorKey = Object.keys(this.ngControl.errors).find(x => this.ngControl.errors[x]);
      const errors = {
        confirmPassword: 'ERRORS.PASSWORD_MATCH',
        required: 'ERRORS.REQUIRED',
        email: 'ERRORS.INVALID_EMAIL',
      };
      return errors[errorKey];
    }
  }

  get displayErrorMsg(): boolean {
    return this.ngControl?.control?.invalid
      && (this.ngControl.control.dirty || this.ngControl.control.touched);
  }

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (_: any) => { };
  onTouch = () => { };

  onInput(value: string): void {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }

  writeValue(obj: any): void {
    this.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
