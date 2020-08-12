import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedItemFooterComponent } from './feed-item-footer.component';

describe('FeedItemFooterComponent', () => {
  let component: FeedItemFooterComponent;
  let fixture: ComponentFixture<FeedItemFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedItemFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
