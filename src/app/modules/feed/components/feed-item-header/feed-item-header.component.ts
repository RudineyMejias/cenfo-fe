import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Feed } from '@/shared/models/feed.model';

@Component({
  selector: 'cf-feed-item-header',
  templateUrl: './feed-item-header.component.html',
  styleUrls: ['./feed-item-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedItemHeaderComponent {
  @Input() feed: Feed;
  @Output() editPost = new EventEmitter<Feed>();
  @Output() removePost = new EventEmitter<Feed>();

  get fullName(): string {
    return `${this.feed?.user?.name} ${this.feed?.user?.last_name}`;
  }
}
