import { Observable } from 'rxjs/Rx';
import { AsyncPipe } from '@angular/common';
import { Pipe, ChangeDetectorRef, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe extends AsyncPipe implements PipeTransform {

  value: string;
  translate: Observable<any>;

  constructor(ref: ChangeDetectorRef, private readonly translateService: TranslateService) {
    super(ref);
  }

  transform(obj: any): any {
    if (typeof obj === 'string') {
      this.value = obj;
      if (!this.translate) {
        this.translate = this.translateService.get(this.value);
      }
      return super.transform(this.translate);
    }

    return super.transform(obj);
  }
}
