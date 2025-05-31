import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayVehicleWiseComponent } from './replay-vehicle-wise.component';

describe('ReplayVehicleWiseComponent', () => {
  let component: ReplayVehicleWiseComponent;
  let fixture: ComponentFixture<ReplayVehicleWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplayVehicleWiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplayVehicleWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
