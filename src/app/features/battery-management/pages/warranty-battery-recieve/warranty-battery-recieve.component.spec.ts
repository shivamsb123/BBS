import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyBatteryRecieveComponent } from './warranty-battery-recieve.component';

describe('WarrantyBatteryRecieveComponent', () => {
  let component: WarrantyBatteryRecieveComponent;
  let fixture: ComponentFixture<WarrantyBatteryRecieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrantyBatteryRecieveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarrantyBatteryRecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
