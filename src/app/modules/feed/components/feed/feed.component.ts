import { Component, OnInit } from '@angular/core';
import { FeedService } from '@/feed/services/feed.service';
import { Feed } from '@/shared/models/feed.model';
import { ToastrService } from 'ngx-toastr';
import { User } from '@/shared/models/user.model';
import { LoadingService } from '@/core/services/loading.service';

@Component({
  selector: 'cf-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public feeds: Feed[];
  public users: User[];

  constructor(
    private readonly feedService: FeedService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadingService.startLoading();
    this.feedService.getFeedItems().subscribe(
      (feeds: Feed[]) => {
        feeds.forEach((feed) => {
          feed.comments = feeds.filter(f => f.parent_feed_id === feed.id);
        });
        this.feeds = feeds.filter(f => !f.parent_feed_id);
      },
      (e) => this.toastrService.error(e?.error?.message),
      () => this.loadingService.stopLoading()
    );
  }

  reactionClick(reactionType: string): void {

  }
}
