import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDamageTyreSummaryComponent } from './report-damage-tyre-summary.component';

describe('ReportDamageTyreSummaryComponent', () => {
  let component: ReportDamageTyreSummaryComponent;
  let fixture: ComponentFixture<ReportDamageTyreSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDamageTyreSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDamageTyreSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
