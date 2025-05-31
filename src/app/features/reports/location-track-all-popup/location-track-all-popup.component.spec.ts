import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTrackAllPopupComponent } from './location-track-all-popup.component';

describe('LocationTrackAllPopupComponent', () => {
  let component: LocationTrackAllPopupComponent;
  let fixture: ComponentFixture<LocationTrackAllPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationTrackAllPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationTrackAllPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
