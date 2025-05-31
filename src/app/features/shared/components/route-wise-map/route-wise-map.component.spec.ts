import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteWiseMapComponent } from './route-wise-map.component';

describe('RouteWiseMapComponent', () => {
  let component: RouteWiseMapComponent;
  let fixture: ComponentFixture<RouteWiseMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteWiseMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteWiseMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
