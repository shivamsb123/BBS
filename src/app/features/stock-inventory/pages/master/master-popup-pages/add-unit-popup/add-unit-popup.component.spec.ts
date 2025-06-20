import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnitPopupComponent } from './add-unit-popup.component';

describe('AddUnitPopupComponent', () => {
  let component: AddUnitPopupComponent;
  let fixture: ComponentFixture<AddUnitPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUnitPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUnitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
