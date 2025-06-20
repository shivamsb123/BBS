import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHsnPopupComponent } from './add-hsn-popup.component';

describe('AddHsnPopupComponent', () => {
  let component: AddHsnPopupComponent;
  let fixture: ComponentFixture<AddHsnPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHsnPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHsnPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
