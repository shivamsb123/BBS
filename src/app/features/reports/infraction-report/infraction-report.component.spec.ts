import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfractionReportComponent } from './infraction-report.component';

describe('InfractionReportComponent', () => {
  let component: InfractionReportComponent;
  let fixture: ComponentFixture<InfractionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfractionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfractionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
