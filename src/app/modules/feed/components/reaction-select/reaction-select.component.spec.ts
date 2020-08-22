import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionSelectComponent } from './reaction-select.component';

describe('ReactionSelectComponent', () => {
  let component: ReactionSelectComponent;
  let fixture: ComponentFixture<ReactionSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
