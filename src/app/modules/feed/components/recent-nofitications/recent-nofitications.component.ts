import { Component, Injector } from '@angular/core';
import { BaseComponent } from '@/shared/components/base/base.component';

@Component({
  selector: 'cf-recent-nofitications',
  templateUrl: './recent-nofitications.component.html',
  styleUrls: ['./recent-nofitications.component.scss']
})
export class RecentNofiticationsComponent extends BaseComponent {

  constructor(injector: Injector) {
    super(injector);
  }
}
