import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyChangeReportComponent } from './duty-change-report.component';

describe('DutyChangeReportComponent', () => {
  let component: DutyChangeReportComponent;
  let fixture: ComponentFixture<DutyChangeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyChangeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DutyChangeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
