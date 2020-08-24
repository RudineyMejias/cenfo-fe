import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Feed } from '@/shared/models/feed.model';

@Component({
  selector: 'cf-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedItemComponent {
  @Input() feed: Feed;
  @Output() selectReaction = new EventEmitter<{ reactionType: string; feed: Feed; }>();

  changeReaction(reactionType: string): void {
    this.selectReaction.emit({ reactionType, feed: this.feed });
  }
}
