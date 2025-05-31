import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoasterComponent } from './add-roaster.component';

describe('AddRoasterComponent', () => {
  let component: AddRoasterComponent;
  let fixture: ComponentFixture<AddRoasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
