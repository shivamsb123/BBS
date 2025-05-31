import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasterAttendanceComponent } from './roaster-attendance.component';

describe('RoasterAttendanceComponent', () => {
  let component: RoasterAttendanceComponent;
  let fixture: ComponentFixture<RoasterAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoasterAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoasterAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
