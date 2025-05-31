import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotRouteComponent } from './plot-route.component';

describe('PlotRouteComponent', () => {
  let component: PlotRouteComponent;
  let fixture: ComponentFixture<PlotRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
