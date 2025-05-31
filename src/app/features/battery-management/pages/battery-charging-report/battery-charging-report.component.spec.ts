import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryChargingReportComponent } from './battery-charging-report.component';

describe('BatteryChargingReportComponent', () => {
  let component: BatteryChargingReportComponent;
  let fixture: ComponentFixture<BatteryChargingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryChargingReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryChargingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
