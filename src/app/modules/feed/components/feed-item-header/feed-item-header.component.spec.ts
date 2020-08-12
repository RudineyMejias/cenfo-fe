import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedItemHeaderComponent } from './feed-item-header.component';

describe('FeedItemHeaderComponent', () => {
  let component: FeedItemHeaderComponent;
  let fixture: ComponentFixture<FeedItemHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedItemHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
