import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftStatusComponent } from './shift-status.component';

describe('ShiftStatusComponent', () => {
  let component: ShiftStatusComponent;
  let fixture: ComponentFixture<ShiftStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
