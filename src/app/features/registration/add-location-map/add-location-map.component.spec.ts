import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationMapComponent } from './add-location-map.component';

describe('AddLocationMapComponent', () => {
  let component: AddLocationMapComponent;
  let fixture: ComponentFixture<AddLocationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLocationMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLocationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
