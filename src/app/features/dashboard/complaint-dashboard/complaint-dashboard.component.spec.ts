import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintDashboardComponent } from './complaint-dashboard.component';

describe('ComplaintDashboardComponent', () => {
  let component: ComplaintDashboardComponent;
  let fixture: ComponentFixture<ComplaintDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
