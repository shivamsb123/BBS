import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryStockReportComponent } from './battery-stock-report.component';

describe('BatteryStockReportComponent', () => {
  let component: BatteryStockReportComponent;
  let fixture: ComponentFixture<BatteryStockReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryStockReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
