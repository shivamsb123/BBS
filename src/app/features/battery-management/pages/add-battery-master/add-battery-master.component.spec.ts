import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatteryMasterComponent } from './add-battery-master.component';

describe('AddBatteryMasterComponent', () => {
  let component: AddBatteryMasterComponent;
  let fixture: ComponentFixture<AddBatteryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBatteryMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBatteryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
