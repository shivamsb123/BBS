import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAlertComponent } from './set-alert.component';

describe('SetAlertComponent', () => {
  let component: SetAlertComponent;
  let fixture: ComponentFixture<SetAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
