import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverWiseTripReportComponent } from './driver-wise-trip-report.component';

describe('DriverWiseTripReportComponent', () => {
  let component: DriverWiseTripReportComponent;
  let fixture: ComponentFixture<DriverWiseTripReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverWiseTripReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverWiseTripReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
