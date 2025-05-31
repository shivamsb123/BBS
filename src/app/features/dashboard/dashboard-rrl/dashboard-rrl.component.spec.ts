import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRrlComponent } from './dashboard-rrl.component';

describe('DashboardRrlComponent', () => {
  let component: DashboardRrlComponent;
  let fixture: ComponentFixture<DashboardRrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
