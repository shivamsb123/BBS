import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageTyreSummaryComponent } from './damage-tyre-summary.component';

describe('DamageTyreSummaryComponent', () => {
  let component: DamageTyreSummaryComponent;
  let fixture: ComponentFixture<DamageTyreSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageTyreSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamageTyreSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
