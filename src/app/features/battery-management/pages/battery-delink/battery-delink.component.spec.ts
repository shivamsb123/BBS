import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryDelinkComponent } from './battery-delink.component';

describe('BatteryDelinkComponent', () => {
  let component: BatteryDelinkComponent;
  let fixture: ComponentFixture<BatteryDelinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryDelinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryDelinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
