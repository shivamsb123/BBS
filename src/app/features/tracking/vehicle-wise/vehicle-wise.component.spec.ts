import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleWiseComponent } from './vehicle-wise.component';

describe('VehicleWiseComponent', () => {
  let component: VehicleWiseComponent;
  let fixture: ComponentFixture<VehicleWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleWiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
