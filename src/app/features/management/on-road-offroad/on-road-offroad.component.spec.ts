import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnRoadOffroadComponent } from './on-road-offroad.component';

describe('OnRoadOffroadComponent', () => {
  let component: OnRoadOffroadComponent;
  let fixture: ComponentFixture<OnRoadOffroadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnRoadOffroadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnRoadOffroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
