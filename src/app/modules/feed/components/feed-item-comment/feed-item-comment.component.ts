import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Feed } from '@/shared/models/feed.model';

@Component({
  selector: 'cf-feed-item-comment',
  templateUrl: './feed-item-comment.component.html',
  styleUrls: ['./feed-item-comment.component.scss']
})
export class FeedItemCommentComponent {
  @Input() comment: Feed;
  @Output() remove = new EventEmitter<Feed>();
  @Output() update = new EventEmitter<Feed>();
}
