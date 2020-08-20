import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loaderCount = 0;
  private loadingSubject = new BehaviorSubject(false);

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  startLoading(): void {
    this.loaderCount++;
    this.loadingSubject.next(this.loaderCount > 0);
  }

  stopLoading(): void {
    this.loaderCount = !this.loaderCount ? 0 : this.loaderCount - 1;
    this.loadingSubject.next(!!this.loaderCount);
  }
}
