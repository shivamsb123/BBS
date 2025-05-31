import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTrackPopupComponent } from './location-track-popup.component';

describe('LocationTrackPopupComponent', () => {
  let component: LocationTrackPopupComponent;
  let fixture: ComponentFixture<LocationTrackPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationTrackPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationTrackPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
