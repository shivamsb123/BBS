import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposeBatteryComponent } from './dispose-battery.component';

describe('DisposeBatteryComponent', () => {
  let component: DisposeBatteryComponent;
  let fixture: ComponentFixture<DisposeBatteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposeBatteryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisposeBatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
