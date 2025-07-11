import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonReportComponent } from './carbon-report.component';

describe('CarbonReportComponent', () => {
  let component: CarbonReportComponent;
  let fixture: ComponentFixture<CarbonReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbonReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
