import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryVehicleWiseComponent } from './history-vehicle-wise.component';

describe('HistoryVehicleWiseComponent', () => {
  let component: HistoryVehicleWiseComponent;
  let fixture: ComponentFixture<HistoryVehicleWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryVehicleWiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryVehicleWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
