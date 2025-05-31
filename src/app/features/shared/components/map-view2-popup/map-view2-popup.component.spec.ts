import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapView2PopupComponent } from './map-view2-popup.component';

describe('MapView2PopupComponent', () => {
  let component: MapView2PopupComponent;
  let fixture: ComponentFixture<MapView2PopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapView2PopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapView2PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
