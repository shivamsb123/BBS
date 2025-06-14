import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoppageReportComponent } from './stoppage-report.component';

describe('StoppageReportComponent', () => {
  let component: StoppageReportComponent;
  let fixture: ComponentFixture<StoppageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoppageReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoppageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
