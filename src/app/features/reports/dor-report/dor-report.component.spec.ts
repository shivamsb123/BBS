import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DorReportComponent } from './dor-report.component';

describe('DorReportComponent', () => {
  let component: DorReportComponent;
  let fixture: ComponentFixture<DorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DorReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
