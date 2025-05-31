import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteViolationReportComponent } from './route-violation-report.component';

describe('RouteViolationReportComponent', () => {
  let component: RouteViolationReportComponent;
  let fixture: ComponentFixture<RouteViolationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteViolationReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteViolationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
