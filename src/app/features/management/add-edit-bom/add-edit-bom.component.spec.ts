import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBomComponent } from './add-edit-bom.component';

describe('AddEditBomComponent', () => {
  let component: AddEditBomComponent;
  let fixture: ComponentFixture<AddEditBomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
