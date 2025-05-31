import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingDetailBatteryComponent } from './charging-detail-battery.component';

describe('ChargingDetailBatteryComponent', () => {
  let component: ChargingDetailBatteryComponent;
  let fixture: ComponentFixture<ChargingDetailBatteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargingDetailBatteryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargingDetailBatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
