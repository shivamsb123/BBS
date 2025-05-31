import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaffRoasterComponent } from './view-staff-roaster.component';

describe('ViewStaffRoasterComponent', () => {
  let component: ViewStaffRoasterComponent;
  let fixture: ComponentFixture<ViewStaffRoasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStaffRoasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStaffRoasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
