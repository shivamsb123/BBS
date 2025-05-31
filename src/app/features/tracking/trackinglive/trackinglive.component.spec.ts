import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingliveComponent } from './trackinglive.component';

describe('TrackingliveComponent', () => {
  let component: TrackingliveComponent;
  let fixture: ComponentFixture<TrackingliveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingliveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingliveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
