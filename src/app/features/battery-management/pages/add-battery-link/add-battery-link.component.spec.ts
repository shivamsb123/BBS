import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatteryLinkComponent } from './add-battery-link.component';

describe('AddBatteryLinkComponent', () => {
  let component: AddBatteryLinkComponent;
  let fixture: ComponentFixture<AddBatteryLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBatteryLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBatteryLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
