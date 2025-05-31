import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyTrackComponent } from './dummy-track.component';

describe('DummyTrackComponent', () => {
  let component: DummyTrackComponent;
  let fixture: ComponentFixture<DummyTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
