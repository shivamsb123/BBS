import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRouteOnMapComponent } from './show-route-on-map.component';

describe('ShowRouteOnMapComponent', () => {
  let component: ShowRouteOnMapComponent;
  let fixture: ComponentFixture<ShowRouteOnMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRouteOnMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowRouteOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
