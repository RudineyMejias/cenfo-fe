import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { LoadingService } from '@/core/services/loading.service';

@Component({
  selector: 'cf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  title = 'cenfo-fe';

  constructor(
    private readonly ngxService: NgxUiLoaderService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.subscription = this.loadingService.loading$.subscribe(isLoading => {
      if (isLoading) {
        this.ngxService.start();
      } else {
        this.ngxService.stop();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
