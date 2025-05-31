import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdometerReportComponent } from './odometer-report.component';

describe('OdometerReportComponent', () => {
  let component: OdometerReportComponent;
  let fixture: ComponentFixture<OdometerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdometerReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdometerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
