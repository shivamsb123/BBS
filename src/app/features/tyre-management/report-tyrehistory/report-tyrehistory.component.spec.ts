import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTyrehistoryComponent } from './report-tyrehistory.component';

describe('ReportTyrehistoryComponent', () => {
  let component: ReportTyrehistoryComponent;
  let fixture: ComponentFixture<ReportTyrehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTyrehistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTyrehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
