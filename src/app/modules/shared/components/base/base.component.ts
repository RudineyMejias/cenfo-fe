import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cf-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export abstract class BaseComponent {

  protected readonly translateService: TranslateService;
  protected wordingKey: string;

  public get sectionWording(): Observable<any> {
    return this.getWording(this.wordingKey);
  }

  constructor(injector: Injector) {
    this.translateService = injector.get(TranslateService);
  }

  // ngOnInit() {
  //   this.translateService.
  // }

  protected getWording(key: string | string[], params?: { [key: string]: string } ): Observable<any> {
    return this.translateService.get(key, params);
  }
}
