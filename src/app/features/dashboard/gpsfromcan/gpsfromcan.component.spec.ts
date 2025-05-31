import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsfromcanComponent } from './gpsfromcan.component';

describe('GpsfromcanComponent', () => {
  let component: GpsfromcanComponent;
  let fixture: ComponentFixture<GpsfromcanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsfromcanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpsfromcanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
