import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVehicleAccessComponent } from './user-vehicle-access.component';

describe('UserVehicleAccessComponent', () => {
  let component: UserVehicleAccessComponent;
  let fixture: ComponentFixture<UserVehicleAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVehicleAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVehicleAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
