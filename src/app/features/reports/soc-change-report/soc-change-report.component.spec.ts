import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocChangeReportComponent } from './soc-change-report.component';

describe('SocChangeReportComponent', () => {
  let component: SocChangeReportComponent;
  let fixture: ComponentFixture<SocChangeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocChangeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocChangeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
