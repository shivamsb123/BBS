import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTyrePunctureComponent } from './report-tyre-puncture.component';

describe('ReportTyrePunctureComponent', () => {
  let component: ReportTyrePunctureComponent;
  let fixture: ComponentFixture<ReportTyrePunctureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTyrePunctureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTyrePunctureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
