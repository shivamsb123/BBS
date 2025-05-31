import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDisposedTyreComponent } from './report-disposed-tyre.component';

describe('ReportDisposedTyreComponent', () => {
  let component: ReportDisposedTyreComponent;
  let fixture: ComponentFixture<ReportDisposedTyreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDisposedTyreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDisposedTyreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
