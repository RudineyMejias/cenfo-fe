import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCommentInputComponent } from './feed-comment-input.component';

describe('FeedCommentInputComponent', () => {
  let component: FeedCommentInputComponent;
  let fixture: ComponentFixture<FeedCommentInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedCommentInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedCommentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
