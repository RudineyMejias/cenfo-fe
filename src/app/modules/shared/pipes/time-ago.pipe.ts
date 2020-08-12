import { Observable } from 'rxjs/Rx';
import { AsyncPipe } from '@angular/common';
import { Pipe, ChangeDetectorRef, PipeTransform } from '@angular/core';
import { TimeAgoValues } from '@/shared/constants';

@Pipe({
  name: 'timeAgo',
  pure: false,
})
export class TimeAgoPipe extends AsyncPipe implements PipeTransform {

  value: string;
  timer: Observable<string>;

  constructor(ref: ChangeDetectorRef) {
    super(ref);
  }

  transform(obj: any): any {
    if (typeof obj === 'string') {
      this.value = obj;
      if (!this.timer) {
        this.timer = this.getObservable();
      }
      return super.transform(this.timer);
    }

    return super.transform(obj);
  }

  private getObservable(): Observable<string> {
    return Observable.interval(1000).startWith(0).map(() => {
      return this.getTimeAgo(this.value, {});
    });
  }

  getTimeAgo(date: string, wording: any): string {
    const dateObj = new Date(date);
    const today = new Date();

    const seconds = Math.round(Math.abs((today.getTime() - dateObj.getTime()) / 1000));
    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(seconds / 3600));
    const days = Math.round(Math.abs(seconds / 86400));
    const months = Math.round(Math.abs(seconds / 2592000));
    const years = Math.round(Math.abs(seconds / 31536000));

    if (Number.isNaN(seconds)) {
      return '';
    } else if (seconds <= TimeAgoValues.SECONDS_AGO) {
      return wording.SECONDS_AGO;
    } else if (seconds <= TimeAgoValues.MINUTE_AGO) {
      return wording.MINUTE_AGO;
    } else if (minutes <= TimeAgoValues.MINUTES_AGO) {
      return  `${minutes} ${wording.MINUTES_AGO}`;
    } else if (minutes <= TimeAgoValues.HOUR_AGO) {
      return  wording.HOUR_AGO;
    } else if (hours <= TimeAgoValues.HOURS_AGO) {
      return `${hours} ${wording.HOURS_AGO}`;
    } else if (hours <= TimeAgoValues.DAY_AGO) {
      return wording.DAY_AGO;
    } else if (days <= TimeAgoValues.DAYS_AGO) {
      return  `${days} ${wording.DAYS_AGO}`;
    } else if (days <=  TimeAgoValues.MONTH_AGO) {
      return wording.MONTH_AGO;
    } else if (days <=  TimeAgoValues.MONTHS_AGO) {
      return `${months} ${wording.MONTHS_AGO}`;
    } else if (days <=  TimeAgoValues.YEAR_AGO) {
      return wording.YEAR_AGO;
    } else { // (days > 545)
      return `${years} ${wording.YEARS_AGO}`;
    }
  }
}
