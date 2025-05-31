import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewLightboxComponent } from './map-view-lightbox.component';

describe('MapViewLightboxComponent', () => {
  let component: MapViewLightboxComponent;
  let fixture: ComponentFixture<MapViewLightboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapViewLightboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapViewLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
