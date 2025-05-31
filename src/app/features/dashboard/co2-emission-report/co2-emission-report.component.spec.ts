import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2EmissionReportComponent } from './co2-emission-report.component';

describe('Co2EmissionReportComponent', () => {
  let component: Co2EmissionReportComponent;
  let fixture: ComponentFixture<Co2EmissionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Co2EmissionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Co2EmissionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
