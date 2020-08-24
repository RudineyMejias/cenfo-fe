import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedItemCommentsComponent } from './feed-item-comments.component';

describe('FeedItemCommentsComponent', () => {
  let component: FeedItemCommentsComponent;
  let fixture: ComponentFixture<FeedItemCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedItemCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
