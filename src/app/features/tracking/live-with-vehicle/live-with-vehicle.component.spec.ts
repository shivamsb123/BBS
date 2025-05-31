import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveWithVehicleComponent } from './live-with-vehicle.component';

describe('LiveWithVehicleComponent', () => {
  let component: LiveWithVehicleComponent;
  let fixture: ComponentFixture<LiveWithVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveWithVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveWithVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
