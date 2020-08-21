import { Observable } from 'rxjs/Rx';
import { AsyncPipe } from '@angular/common';
import { Pipe, ChangeDetectorRef, PipeTransform } from '@angular/core';
import { TimeAgoValues } from '@/shared/constants';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { concatMap } from 'rxjs/operators';

@Pipe({
  name: 'timeAgo',
  pure: false,
})
export class TimeAgoPipe extends AsyncPipe implements PipeTransform {

  value: number;
  timer: Observable<string>;

  constructor(ref: ChangeDetectorRef, private readonly translateService: TranslateService) {
    super(ref);
  }

  transform(obj: any): any {
    if (typeof obj === 'number') {
      this.value = obj;
      if (!this.timer) {
        this.timer = this.getObservable();
      }
      return super.transform(this.timer);
    }

    return super.transform(obj);
  }

  private getObservable(): Observable<string> {
    return Observable.interval(1000).startWith(0).pipe(
      concatMap(() => {
        const config = this.getTimeAgo();
        return !config ? of('') : this.translateService.get(config.wordingKey, { value: config.value });
      })
    );
  }

  getTimeAgo(): { wordingKey: string, value?: number } {
    const dateObj = new Date(this.value);
    const today = new Date();

    const seconds = Math.round(Math.abs((today.getTime() - dateObj.getTime()) / 1000));
    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(seconds / 3600));
    const days = Math.round(Math.abs(seconds / 86400));
    const months = Math.round(Math.abs(seconds / 2592000));
    const years = Math.round(Math.abs(seconds / 31536000));

    if (Number.isNaN(seconds)) {
      return undefined;
    } else if (seconds <= TimeAgoValues.SECONDS_AGO) {
      return { wordingKey: 'TIMES.SECONDS_AGO' };
    } else if (seconds <= TimeAgoValues.MINUTE_AGO) {
      return { wordingKey: 'TIMES.MINUTE_AGO' };
    } else if (minutes <= TimeAgoValues.MINUTES_AGO) {
      return  { value: minutes, wordingKey: 'TIMES.MINUTES_AGO' };
    } else if (minutes <= TimeAgoValues.HOUR_AGO) {
      return  { wordingKey: 'TIMES.HOUR_AGO' };
    } else if (hours <= TimeAgoValues.HOURS_AGO) {
      return { value: hours, wordingKey: 'TIMES.HOURS_AGO' };
    } else if (hours <= TimeAgoValues.DAY_AGO) {
      return { wordingKey: 'TIMES.DAY_AGO' };
    } else if (days <= TimeAgoValues.DAYS_AGO) {
      return  { value: days, wordingKey: 'TIMES.DAYS_AGO' };
    } else if (days <=  TimeAgoValues.MONTH_AGO) {
      return { wordingKey: 'TIMES.MONTH_AGO' };
    } else if (days <=  TimeAgoValues.MONTHS_AGO) {
      return { value: months, wordingKey: 'TIMES.MONTHS_AGO' };
    } else if (days <=  TimeAgoValues.YEAR_AGO) {
      return { wordingKey: 'TIMES.YEAR_AGO' };
    } else { // (days > 545)
      return { value: years, wordingKey: 'TIMES.YEARS_AGO' };
    }
  }
}
