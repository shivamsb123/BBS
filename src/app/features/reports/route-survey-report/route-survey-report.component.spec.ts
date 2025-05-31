import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSurveyReportComponent } from './route-survey-report.component';

describe('RouteSurveyReportComponent', () => {
  let component: RouteSurveyReportComponent;
  let fixture: ComponentFixture<RouteSurveyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteSurveyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteSurveyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
