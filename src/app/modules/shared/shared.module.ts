import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@/shared/components/input/input.component';
import { NavbarComponent } from '@/shared/components/navbar/navbar.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

const exportedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HammerModule,
];

const components = [
  InputComponent,
  NavbarComponent,
];

@NgModule({
  declarations: [
    ...components,
    TimeAgoPipe,
  ],
  imports: [
    ...exportedModules,
  ],
  exports: [
   ...exportedModules,
   ...components,
  ]
})
export class SharedModule { }
