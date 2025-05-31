import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCurrentyLinkedTyreComponent } from './report-currenty-linked-tyre.component';

describe('ReportCurrentyLinkedTyreComponent', () => {
  let component: ReportCurrentyLinkedTyreComponent;
  let fixture: ComponentFixture<ReportCurrentyLinkedTyreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCurrentyLinkedTyreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCurrentyLinkedTyreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
