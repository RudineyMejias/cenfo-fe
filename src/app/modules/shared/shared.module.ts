import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@/shared/components/input/input.component';
import { NavbarComponent } from '@/shared/components/navbar/navbar.component';
import { TimeAgoPipe } from '@/shared/pipes/time-ago.pipe';
import { TranslatePipe } from '@/shared/pipes/translate.pipe';

const exportedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HammerModule,
];

const components = [
  InputComponent,
  NavbarComponent,
  TimeAgoPipe,
  TranslatePipe
];

@NgModule({
  declarations: [
    ...components,
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
