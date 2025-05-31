import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeoFanceZigZagV2Component } from './add-geo-fance-zig-zag-v2.component';

describe('AddGeoFanceZigZagV2Component', () => {
  let component: AddGeoFanceZigZagV2Component;
  let fixture: ComponentFixture<AddGeoFanceZigZagV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGeoFanceZigZagV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGeoFanceZigZagV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
