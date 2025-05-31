import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAppDmsDriverComponent } from './add-user-app-dms-driver.component';

describe('AddUserAppDmsDriverComponent', () => {
  let component: AddUserAppDmsDriverComponent;
  let fixture: ComponentFixture<AddUserAppDmsDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserAppDmsDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserAppDmsDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
