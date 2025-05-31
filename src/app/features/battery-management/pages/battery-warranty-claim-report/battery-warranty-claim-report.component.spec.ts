import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryWarrantyClaimReportComponent } from './battery-warranty-claim-report.component';

describe('BatteryWarrantyClaimReportComponent', () => {
  let component: BatteryWarrantyClaimReportComponent;
  let fixture: ComponentFixture<BatteryWarrantyClaimReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryWarrantyClaimReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryWarrantyClaimReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
