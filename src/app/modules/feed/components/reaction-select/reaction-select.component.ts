import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Reaction } from '@/modules/shared/models/reaction.model';
import { Reactions } from '@/modules/shared/constants';

@Component({
  selector: 'cf-reaction-select',
  templateUrl: './reaction-select.component.html',
  styleUrls: ['./reaction-select.component.scss', '/src/styles/_feed-actions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactionSelectComponent {
  @Input() selectedReaction: Reaction;
  @Output() selectReaction = new EventEmitter<string>();

  get reactionTypes(): { type: string, url: string, display: string }[] {
    return Object.values(Reactions).map((r) => 
      ({ url: `/assets/images/${r}.png`, display: this.getWordingKey(r), type: r })
    );
  }

  getWordingKey(reactionKey: string): string {
    return reactionKey && `FEED.REACTIONS.${reactionKey.toUpperCase()}`;
  }

  reactionClick(reactionType: string): void {
    this.selectReaction.emit(
      reactionType === this.selectedReaction?.reaction_type ? undefined : reactionType
    );
  }
}
