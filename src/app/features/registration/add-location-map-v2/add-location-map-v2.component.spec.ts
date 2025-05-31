import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationMapV2Component } from './add-location-map-v2.component';

describe('AddLocationMapV2Component', () => {
  let component: AddLocationMapV2Component;
  let fixture: ComponentFixture<AddLocationMapV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLocationMapV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLocationMapV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
