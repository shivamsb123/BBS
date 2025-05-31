import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGeofenceComponent } from './new-geofence.component';

describe('NewGeofenceComponent', () => {
  let component: NewGeofenceComponent;
  let fixture: ComponentFixture<NewGeofenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGeofenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGeofenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
