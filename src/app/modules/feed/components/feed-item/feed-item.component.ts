import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit } from '@angular/core';
import { Feed } from '@/shared/models/feed.model';
import { AuthenticationService } from '@/core/services/authentication.service';
import { User } from '@/modules/shared/models/user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cf-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedItemComponent implements OnInit {
  @Input() feed: Feed;
  @Output() selectReaction = new EventEmitter<{ reactionType: string; feed: Feed; }>();
  @Output() editPost = new EventEmitter<Feed>();
  @Output() removePost = new EventEmitter<Feed>();
  @Output() postComment = new EventEmitter<Feed>();
  displayComments = false;
  user: User;

  constructor(private readonly authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.authenticatedUser$.pipe(take(1)).subscribe((u) => this.user = u);
  }

  commentsClick(): void {
    if (!this.displayComments) {
      this.displayComments = true;
    }
  }

  changeReaction(reactionType: string): void {
    this.selectReaction.emit({ reactionType, feed: this.feed });
  }

  addComment(text: string, parentFeed: Feed): void {
    const feed: Feed = {
      text,
      parent_feed_id: parentFeed.id,
      comments: [],
      reactions: [],
      creator_user_id: this.user.id,
    };
    this.postComment.emit(feed);
  }
}
