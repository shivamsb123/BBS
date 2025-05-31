import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mapview2Component } from './mapview2.component';

describe('Mapview2Component', () => {
  let component: Mapview2Component;
  let fixture: ComponentFixture<Mapview2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mapview2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mapview2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
