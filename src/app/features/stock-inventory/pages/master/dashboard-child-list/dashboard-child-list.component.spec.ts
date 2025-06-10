import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChildListComponent } from './dashboard-child-list.component';

describe('DashboardChildListComponent', () => {
  let component: DashboardChildListComponent;
  let fixture: ComponentFixture<DashboardChildListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardChildListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardChildListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
