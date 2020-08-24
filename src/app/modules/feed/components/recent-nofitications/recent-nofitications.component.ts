import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Notification } from '@/shared/models/notification.model';

@Component({
  selector: 'cf-recent-nofitications',
  templateUrl: './recent-nofitications.component.html',
  styleUrls: ['./recent-nofitications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentNofiticationsComponent {
  @Input() notifications: Notification[];
}
