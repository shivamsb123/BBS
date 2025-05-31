import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryMakerComponent } from './battery-maker.component';

describe('BatteryMakerComponent', () => {
  let component: BatteryMakerComponent;
  let fixture: ComponentFixture<BatteryMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryMakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
