import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPunctureCountComponent } from './report-puncture-count.component';

describe('ReportPunctureCountComponent', () => {
  let component: ReportPunctureCountComponent;
  let fixture: ComponentFixture<ReportPunctureCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPunctureCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPunctureCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
