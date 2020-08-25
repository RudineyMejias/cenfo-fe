import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '@/core/services/authentication.service';
import { Observable } from 'rxjs';
import { User } from '@/modules/shared/models/user.model';
import { Feed } from '../../../shared/models/feed.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'cf-feed-comment-input',
  templateUrl: './feed-comment-input.component.html',
  styleUrls: ['./feed-comment-input.component.scss'],
  changeDetection:  ChangeDetectionStrategy.OnPush,
})
export class FeedCommentInputComponent implements OnInit {

  @Input() text = '';
  @Output() post = new EventEmitter<string>();

  formGroup: FormGroup;

  get user$(): Observable<User> {
    return this.authenticationService.authenticatedUser$;
  }

  constructor(private readonly authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      text: new FormControl(this.text, [Validators.required]),
    });
  }

  postComment(): void {
    this.post.emit(this.formGroup.value.text);
    this.formGroup.reset();
  }
}
