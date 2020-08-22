import { NgModule } from '@angular/core';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './components/feed/feed.component';
import { ProfileBoxComponent } from './components/profile-box/profile-box.component';
import { RecentNofiticationsComponent } from './components/recent-nofitications/recent-nofitications.component';
import { SharePostComponent } from './components/share-post/share-post.component';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { FeedItemHeaderComponent } from './components/feed-item-header/feed-item-header.component';
import { FeedItemFooterComponent } from './components/feed-item-footer/feed-item-footer.component';
import { FeedItemCommentsComponent } from './components/feed-item-comments/feed-item-comments.component';
import { SharedModule } from '@/shared/shared.module';
import { FeedService } from './services/feed.service';
import { ReactionSelectComponent } from './components/reaction-select/reaction-select.component';


@NgModule({
  declarations: [
    FeedComponent,
    ProfileBoxComponent,
    RecentNofiticationsComponent,
    SharePostComponent,
    FeedItemComponent,
    FeedItemHeaderComponent,
    FeedItemFooterComponent,
    FeedItemCommentsComponent,
    ReactionSelectComponent
  ],
  providers: [FeedService],
  imports: [
    FeedRoutingModule,
    SharedModule,
  ]
})
export class FeedModule { }
