import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyReportComponent } from './duty-report.component';

describe('DutyReportComponent', () => {
  let component: DutyReportComponent;
  let fixture: ComponentFixture<DutyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DutyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
