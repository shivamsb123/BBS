import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSalaryReportComponent } from './driver-salary-report.component';

describe('DriverSalaryReportComponent', () => {
  let component: DriverSalaryReportComponent;
  let fixture: ComponentFixture<DriverSalaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverSalaryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverSalaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
