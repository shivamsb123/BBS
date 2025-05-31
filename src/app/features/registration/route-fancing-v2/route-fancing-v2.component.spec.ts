import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteFancingV2Component } from './route-fancing-v2.component';

describe('RouteFancingV2Component', () => {
  let component: RouteFancingV2Component;
  let fixture: ComponentFixture<RouteFancingV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteFancingV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteFancingV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
