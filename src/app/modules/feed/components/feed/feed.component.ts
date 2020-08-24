import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'cf-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public feeds: Feed[];
  public users: User[];
  private authenticatedUser: User;

  constructor(
    private readonly feedService: FeedService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly modalService: NgbModal,
    private readonly authenticationService: AuthenticationService
  ) {
    this.saveNewPost = this.saveNewPost.bind(this);
  }

  async ngOnInit(): Promise<void> {
    this.authenticationService.authenticatedUser$.pipe(take(1))
      .subscribe((u) => this.authenticatedUser = u);
    this.loadFeedItems();
  }

  async loadFeedItems(): Promise<void> {
    this.loadingService.startLoading();
    try {
      const feeds: Feed[] = await this.feedService.getFeedItems().toPromise();
      feeds.forEach((feed) => {
        feed.comments = feeds.filter(f => f.parent_feed_id === feed.id);
      });
      this.feeds = feeds.filter(f => !f.parent_feed_id);
    } catch (e) {
      this.toastrService.error(e?.error?.message);
    }
    this.loadingService.stopLoading();
  }

  reactionClick({ reactionType, feed }: { reactionType: string; feed: Feed; }): void {
    const feedCopy = { ...feed };
    const reactionToRemoveIndex = feedCopy.reactions.findIndex((r) => r.user.id === this.authenticatedUser.id);
    if (reactionToRemoveIndex >= 0) {
      feedCopy.reactions.splice(reactionToRemoveIndex, 1);
    }
    if (reactionType) {
      const reactionToAdd: Reaction = { reaction_type: reactionType, user: { ...this.authenticatedUser } };
      feedCopy.reactions.push(reactionToAdd);
    }

    const feedIndex = this.feeds.indexOf(feed);
    this.feeds[feedIndex] = feedCopy;
  }

  async saveNewPost(feed: Feed, modal: NgbActiveModal): Promise<void> {
    this.loadingService.startLoading();
    try {
      const newFeed = await this.feedService.addFeed(feed).toPromise();
      this.feeds = [newFeed].concat(this.feeds);
      modal.dismiss();
    } catch (e) {
      this.toastrService.error(e?.error?.message);
    }
    this.loadingService.stopLoading();
  }

  openPostModal(): void {
    const modalRef = this.modalService.open(CreatePostComponent);
    modalRef.componentInstance.submitPost = this.saveNewPost;
  }
}
