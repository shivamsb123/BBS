import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCountforbusComponent } from './report-countforbus.component';

describe('ReportCountforbusComponent', () => {
  let component: ReportCountforbusComponent;
  let fixture: ComponentFixture<ReportCountforbusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCountforbusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCountforbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
