import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopreportIntervalwiseComponent } from './stopreport-intervalwise.component';

describe('StopreportIntervalwiseComponent', () => {
  let component: StopreportIntervalwiseComponent;
  let fixture: ComponentFixture<StopreportIntervalwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopreportIntervalwiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopreportIntervalwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
