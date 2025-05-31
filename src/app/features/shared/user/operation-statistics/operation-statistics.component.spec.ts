import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationStatisticsComponent } from './operation-statistics.component';

describe('OperationStatisticsComponent', () => {
  let component: OperationStatisticsComponent;
  let fixture: ComponentFixture<OperationStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
