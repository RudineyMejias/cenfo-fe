import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'cf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cenfo-fe';

  constructor(private ngxService: NgxUiLoaderService) {}

  ngOnInit() {
    this.ngxService.start();
  }
}
