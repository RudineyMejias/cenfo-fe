import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './components/feed/feed.component';
import { ProfileBoxComponent } from './components/profile-box/profile-box.component';
import { RecentNofiticationsComponent } from './components/recent-nofitications/recent-nofitications.component';
import { SharePostComponent } from './components/share-post/share-post.component';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { FeedItemHeaderComponent } from './components/feed-item-header/feed-item-header.component';
import { FeedItemFooterComponent } from './components/feed-item-footer/feed-item-footer.component';
import { FeedItemCommentsComponent } from './components/feed-item-comments/feed-item-comments.component';


@NgModule({
  declarations: [
    FeedComponent,
    ProfileBoxComponent,
    RecentNofiticationsComponent,
    SharePostComponent,
    FeedItemComponent,
    FeedItemHeaderComponent,
    FeedItemFooterComponent,
    FeedItemCommentsComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule
  ]
})
export class FeedModule { }
