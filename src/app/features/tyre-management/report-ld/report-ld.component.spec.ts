import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLdComponent } from './report-ld.component';

describe('ReportLdComponent', () => {
  let component: ReportLdComponent;
  let fixture: ComponentFixture<ReportLdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportLdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportLdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
