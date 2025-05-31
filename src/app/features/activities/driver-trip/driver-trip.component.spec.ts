import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTripComponent } from './driver-trip.component';

describe('DriverTripComponent', () => {
  let component: DriverTripComponent;
  let fixture: ComponentFixture<DriverTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
