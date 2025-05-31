import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffRoasterComponent } from './add-staff-roaster.component';

describe('AddStaffRoasterComponent', () => {
  let component: AddStaffRoasterComponent;
  let fixture: ComponentFixture<AddStaffRoasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffRoasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffRoasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
