import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMasterV2Component } from './vehicle-master-v2.component';

describe('VehicleMasterV2Component', () => {
  let component: VehicleMasterV2Component;
  let fixture: ComponentFixture<VehicleMasterV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleMasterV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleMasterV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
