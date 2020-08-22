import { Component, Input } from '@angular/core';
import { Reaction } from '@/modules/shared/models/reaction.model';

@Component({
  selector: 'cf-reaction-select',
  templateUrl: './reaction-select.component.html',
  styleUrls: ['/src/styles/_feed-actions.scss']
})
export class ReactionSelectComponent {
  @Input() selectedReaction: Reaction;
}
