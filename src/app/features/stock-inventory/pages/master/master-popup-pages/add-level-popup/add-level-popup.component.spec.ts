import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevelPopupComponent } from './add-level-popup.component';

describe('AddLevelPopupComponent', () => {
  let component: AddLevelPopupComponent;
  let fixture: ComponentFixture<AddLevelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLevelPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLevelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
