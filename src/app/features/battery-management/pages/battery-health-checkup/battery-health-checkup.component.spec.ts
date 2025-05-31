import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryHealthCheckupComponent } from './battery-health-checkup.component';

describe('BatteryHealthCheckupComponent', () => {
  let component: BatteryHealthCheckupComponent;
  let fixture: ComponentFixture<BatteryHealthCheckupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryHealthCheckupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryHealthCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
