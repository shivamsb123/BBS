import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplychainDashboardComponent } from './supplychain-dashboard.component';

describe('SupplychainDashboardComponent', () => {
  let component: SupplychainDashboardComponent;
  let fixture: ComponentFixture<SupplychainDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplychainDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplychainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
