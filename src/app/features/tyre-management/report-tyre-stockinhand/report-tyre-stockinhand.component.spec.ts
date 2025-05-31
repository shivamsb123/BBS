import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTyreStockinhandComponent } from './report-tyre-stockinhand.component';

describe('ReportTyreStockinhandComponent', () => {
  let component: ReportTyreStockinhandComponent;
  let fixture: ComponentFixture<ReportTyreStockinhandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTyreStockinhandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTyreStockinhandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
