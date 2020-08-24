import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Reaction } from '@/modules/shared/models/reaction.model';
import { AuthenticationService } from '@/core/services/authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@/shared/models/user.model';

@Component({
  selector: 'cf-feed-item-footer',
  templateUrl: './feed-item-footer.component.html',
  styleUrls: ['./feed-item-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedItemFooterComponent {

  @Input() numberOfComments: number;
  @Input() reactions: Reaction[];
  @Output() selectReaction = new EventEmitter<string>();
  @Output() commentsClick = new EventEmitter<void>();

  get reactionIcons(): string[] {
    return this.reactions.map(r => `/assets/images/${r.reaction_type}.png`)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  get ownReaction$(): Observable<Reaction> {
    return this.authenticationService.authenticatedUser$.pipe(
      map((user: User) => this.reactions?.find((r) => r.user?.id === user.id))
    );
  }

  constructor(private readonly authenticationService: AuthenticationService) {}
}
