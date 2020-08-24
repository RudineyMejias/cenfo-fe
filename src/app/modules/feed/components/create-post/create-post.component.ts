import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '@/core/services/authentication.service';
import { Observable } from 'rxjs';
import { User } from '@/modules/shared/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Feed } from '@/shared/models/feed.model';

@Component({
  selector: 'cf-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  @Input() submitPost: (feed: Feed, modal: NgbActiveModal) => void;

  formGroup: FormGroup;

  get user$(): Observable<User> {
    return this.authenticationService.authenticatedUser$;
  }

  constructor(
    public readonly activeModal: NgbActiveModal,
    private readonly authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      text: new FormControl('', [Validators.required]),
      image_url: new FormControl(''),
    });
  }

  onSubmit(user: User): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAsDirty();
      return;
    }
    const feed: Feed = {
      creator_user_id: user.id,
      ...this.formGroup.value,
    };

    this.submitPost(feed, this.activeModal);
  }
}
