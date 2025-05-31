import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTripComponent } from './show-trip.component';

describe('ShowTripComponent', () => {
  let component: ShowTripComponent;
  let fixture: ComponentFixture<ShowTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
