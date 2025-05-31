import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHealthReportComponent } from './device-health-report.component';

describe('DeviceHealthReportComponent', () => {
  let component: DeviceHealthReportComponent;
  let fixture: ComponentFixture<DeviceHealthReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceHealthReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceHealthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
