import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastTrackerComponent } from './fast-tracker.component';

describe('FastTrackerComponent', () => {
  let component: FastTrackerComponent;
  let fixture: ComponentFixture<FastTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
