import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMasterInfoComponent } from './vehicle-master-info.component';

describe('VehicleMasterInfoComponent', () => {
  let component: VehicleMasterInfoComponent;
  let fixture: ComponentFixture<VehicleMasterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleMasterInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleMasterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
