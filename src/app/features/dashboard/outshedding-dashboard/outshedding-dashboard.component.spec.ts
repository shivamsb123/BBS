import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsheddingDashboardComponent } from './outshedding-dashboard.component';

describe('OutsheddingDashboardComponent', () => {
  let component: OutsheddingDashboardComponent;
  let fixture: ComponentFixture<OutsheddingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutsheddingDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutsheddingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
