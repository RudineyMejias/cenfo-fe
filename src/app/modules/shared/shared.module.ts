import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@/shared/components/input/input.component';
import { NavbarComponent } from '@/shared/components/navbar/navbar.component';
import { TimeAgoPipe } from '@/shared/pipes/time-ago.pipe';
import { TranslateModule } from '@ngx-translate/core';

const exportedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HammerModule,
  TranslateModule,
];

const components = [
  InputComponent,
  NavbarComponent,
  TimeAgoPipe,
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
