import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Feed } from '@/shared/models/feed.model';

@Component({
  selector: 'cf-feed-item-header',
  templateUrl: './feed-item-header.component.html',
  styleUrls: ['./feed-item-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedItemHeaderComponent {
  @Input() feed: Feed;

  get fullName(): string {
    return `${this.feed?.user?.name} ${this.feed?.user?.last_name}`;
  }
}
