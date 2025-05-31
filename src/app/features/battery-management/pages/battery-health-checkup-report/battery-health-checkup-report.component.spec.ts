import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryHealthCheckupReportComponent } from './battery-health-checkup-report.component';

describe('BatteryHealthCheckupReportComponent', () => {
  let component: BatteryHealthCheckupReportComponent;
  let fixture: ComponentFixture<BatteryHealthCheckupReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryHealthCheckupReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryHealthCheckupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
