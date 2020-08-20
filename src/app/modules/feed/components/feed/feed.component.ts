import { Component, OnInit } from '@angular/core';
import { FeedService } from '@/feed/services/feed.service';
import { Feed } from '@/shared/models/feed.model';
import { UserService } from '@/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '@/shared/models/user.model';
import { LoadingService } from '@/core/services/loading.service';
import { forkJoin } from 'rxjs';

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
    private readonly userService: UserService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadingService.startLoading();
    forkJoin({
      feeds: this.feedService.getFeedItems(),
      users: this.userService.getAllUsers()
    }).subscribe(
      ({ feeds, users }) => {
        this.users = users;
        this.feeds = feeds;
        this.feeds.forEach((feed) => feed.user = users.find((u) => u.id === feed.creator_user_id));
      },
      (e) => this.toastrService.error(e?.error?.message),
      () => this.loadingService.stopLoading()
    );
  }
}
