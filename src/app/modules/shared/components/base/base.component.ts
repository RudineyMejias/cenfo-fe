import { Component, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cf-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export abstract class BaseComponent {

  protected readonly translateService: TranslateService;

  constructor(injector: Injector) {
    this.translateService = injector.get(TranslateService);
  }
}
