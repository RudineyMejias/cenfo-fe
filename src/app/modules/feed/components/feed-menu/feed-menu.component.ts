import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cf-feed-menu',
  templateUrl: './feed-menu.component.html',
  styleUrls: ['./feed-menu.component.scss'],
  changeDetection:  ChangeDetectionStrategy.OnPush,
})
export class FeedMenuComponent {

  @Output() editPost = new EventEmitter<void>();
  @Output() removePost = new EventEmitter<void>();

}
