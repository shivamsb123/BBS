import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewJobcardComponent } from './add-new-jobcard.component';

describe('AddNewJobcardComponent', () => {
  let component: AddNewJobcardComponent;
  let fixture: ComponentFixture<AddNewJobcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewJobcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewJobcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
