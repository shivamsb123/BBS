import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTripReportComponent } from './driver-trip-report.component';

describe('DriverTripReportComponent', () => {
  let component: DriverTripReportComponent;
  let fixture: ComponentFixture<DriverTripReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverTripReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverTripReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
