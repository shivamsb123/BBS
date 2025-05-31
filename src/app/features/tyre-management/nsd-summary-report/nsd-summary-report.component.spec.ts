import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsdSummaryReportComponent } from './nsd-summary-report.component';

describe('NsdSummaryReportComponent', () => {
  let component: NsdSummaryReportComponent;
  let fixture: ComponentFixture<NsdSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsdSummaryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NsdSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
