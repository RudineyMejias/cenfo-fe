import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@/shared/components/input/input.component';
import { NavbarComponent } from '@/shared/components/navbar/navbar.component';
import { TimeAgoPipe } from '@/shared/pipes/time-ago.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { BindingContextDirective } from './directives/binding-content.directive';

const exportedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HammerModule,
  TranslateModule,
  NgbModule,
];

const components = [
  InputComponent,
  NavbarComponent,
  TimeAgoPipe,
  BindingContextDirective,
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
