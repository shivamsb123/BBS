import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTyreNsdComponent } from './report-tyre-nsd.component';

describe('ReportTyreNsdComponent', () => {
  let component: ReportTyreNsdComponent;
  let fixture: ComponentFixture<ReportTyreNsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTyreNsdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTyreNsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
