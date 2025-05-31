import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStaffAttendanceComponent } from './manage-staff-attendance.component';

describe('ManageStaffAttendanceComponent', () => {
  let component: ManageStaffAttendanceComponent;
  let fixture: ComponentFixture<ManageStaffAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStaffAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStaffAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
