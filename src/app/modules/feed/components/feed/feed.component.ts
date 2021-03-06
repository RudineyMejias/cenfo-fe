import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FeedService } from '@/feed/services/feed.service';
import { Feed } from '@/shared/models/feed.model';
import { ToastrService } from 'ngx-toastr';
import { User } from '@/shared/models/user.model';
import { LoadingService } from '@/core/services/loading.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePostComponent } from '@/feed/components/create-post/create-post.component';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { take } from 'rxjs/operators';
import { Reaction } from '@/modules/shared/models/reaction.model';
import { TranslateService } from '@ngx-translate/core';
import { Notification } from '@/shared/models/notification.model';

@Component({
  selector: 'cf-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {

  public feeds: Feed[];
  public notifications: Notification[];
  private authenticatedUser: User;

  constructor(
    private readonly feedService: FeedService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly modalService: NgbModal,
    private readonly translateService: TranslateService,
    private readonly authenticationService: AuthenticationService,
    private readonly ref: ChangeDetectorRef
  ) {
    this.saveNewPost = this.saveNewPost.bind(this);
    this.updateFeed = this.updateFeed.bind(this);
  }

  async ngOnInit(): Promise<void> {
    this.authenticationService.authenticatedUser$.pipe(take(1))
      .subscribe((u) => this.authenticatedUser = u);
    await this.getNotifications();
    await this.loadFeedItems();
  }

  async getNotifications(): Promise<void> {
    this.loadingService.startLoading();
    try {
      this.notifications = await this.feedService.getRecentNotifications().toPromise();
    } catch (e) {
      this.toastrService.error(e?.error?.message);
    }
    this.loadingService.stopLoading();
  }

  async loadFeedItems(): Promise<void> {
    this.loadingService.startLoading();
    try {
      const feeds: Feed[] = await this.feedService.getFeedItems().toPromise();
      this.mapFeedItems(feeds);
    } catch (e) {
      this.toastrService.error(e?.error?.message);
    }
    this.loadingService.stopLoading();
  }

  async reactionClick({ reactionType, feed }: { reactionType: string; feed: Feed; }): Promise<void> {
    const feedCopy = { ...feed };
    const reactionToRemoveIndex = feedCopy.reactions.findIndex((r) => r.user.id === this.authenticatedUser.id);
    if (reactionToRemoveIndex >= 0) {
      feedCopy.reactions.splice(reactionToRemoveIndex, 1);
    }
    if (reactionType) {
      const reactionToAdd: Reaction = {
        reaction_type: reactionType,
        user: { ...this.authenticatedUser }
      };
      feedCopy.reactions.push(reactionToAdd);
    }

    await this.updateFeed(feedCopy);
  }

  async updateFeed(feed: Feed, modal?: NgbActiveModal): Promise<void> {
    this.loadingService.startLoading();
    try {
      const feedUpdated = await this.feedService.updateFeed(feed).toPromise();
      if (feedUpdated.parent_feed_id) {
        feedUpdated.isEditable = true;
        const parentFeed = this.feeds.find((f) => f.id === feedUpdated.parent_feed_id);
        const commentIndex = parentFeed.comments.findIndex(f => f.id === feedUpdated.id);
        parentFeed.comments[commentIndex] = feedUpdated;
      } else {
        const feedIndex = this.feeds.findIndex(f => f.id === feedUpdated.id);
        this.feeds[feedIndex] = feedUpdated;
      }
      modal?.dismiss();
      this.ref.detectChanges();
    } catch (e) {
      this.toastrService.error(e?.error?.message);
    }
    this.loadingService.stopLoading();
  }

  async saveNewPost(feed: Feed, modal?: NgbActiveModal): Promise<void> {
    this.loadingService.startLoading();
    try {
      const feedAdded = await this.feedService.addFeed(feed).toPromise();
      feedAdded.isEditable = true;
      if (feedAdded.parent_feed_id) {
        const feedUpdated = this.feeds.find((f) => f.id === feedAdded.parent_feed_id);
        feedUpdated.comments = [feedAdded].concat(feedUpdated.comments);
      } else {
        this.feeds = [feedAdded].concat(this.feeds);
      }
      modal?.dismiss();
      this.ref.detectChanges();
      const successMessage = await this.translateService.get('FEED.FEED_ADDED').toPromise();
      this.toastrService.info(successMessage);
    } catch (e) {
      this.toastrService.error(e?.error?.message);
    }
    this.loadingService.stopLoading();
  }

  async removePost(feed: Feed): Promise<void> {
    this.loadingService.startLoading();
    try {
      await this.feedService.deleteFeed(feed.id).toPromise();
      if (feed.parent_feed_id) {
        const parentFeed = this.feeds.find(f => f.id === feed.parent_feed_id);
        const deleteCommentIndex = parentFeed.comments.findIndex(f => f.id === feed.id);
        parentFeed.comments.splice(deleteCommentIndex, 1);
      } else {
        const deletedFeedIndex = this.feeds.findIndex(f => f.id === feed.id);
        this.feeds.splice(deletedFeedIndex, 1);
      }
      this.ref.detectChanges();
      const successMessage = await this.translateService.get('FEED.FEED_REMOVED').toPromise();
      this.toastrService.info(successMessage);
    } catch (e) {
      this.toastrService.error(e?.error?.message);
    }
    this.loadingService.stopLoading();
  }

  async editPost(feed: Feed): Promise<void> {
    const modalRef = this.modalService.open(CreatePostComponent);
    modalRef.componentInstance.submitPost = this.updateFeed;
    modalRef.componentInstance.feed = feed;
  }

  openPostModal(): void {
    const modalRef = this.modalService.open(CreatePostComponent);
    modalRef.componentInstance.submitPost = this.saveNewPost;
  }

  private mapFeedItems(feeds: Feed[]): void {
    feeds.forEach((feed) => {
      feed.isEditable = this.authenticatedUser.id === feed.user.id;
      feed.comments = feeds.filter(f => f.parent_feed_id === feed.id);
    });
    this.feeds = feeds.filter(f => !f.parent_feed_id);
    this.ref.detectChanges();
  }
}
