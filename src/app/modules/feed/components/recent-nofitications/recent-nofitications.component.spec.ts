import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentNofiticationsComponent } from './recent-nofitications.component';

describe('RecentNofiticationsComponent', () => {
  let component: RecentNofiticationsComponent;
  let fixture: ComponentFixture<RecentNofiticationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentNofiticationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentNofiticationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
