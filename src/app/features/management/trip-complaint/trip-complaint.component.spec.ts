import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripComplaintComponent } from './trip-complaint.component';

describe('TripComplaintComponent', () => {
  let component: TripComplaintComponent;
  let fixture: ComponentFixture<TripComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripComplaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
