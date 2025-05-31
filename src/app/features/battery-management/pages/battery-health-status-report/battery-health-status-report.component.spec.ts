import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryHealthStatusReportComponent } from './battery-health-status-report.component';

describe('BatteryHealthStatusReportComponent', () => {
  let component: BatteryHealthStatusReportComponent;
  let fixture: ComponentFixture<BatteryHealthStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryHealthStatusReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryHealthStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
