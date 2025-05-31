import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsDashbaordComponent } from './dms-dashbaord.component';

describe('DmsDashbaordComponent', () => {
  let component: DmsDashbaordComponent;
  let fixture: ComponentFixture<DmsDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmsDashbaordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmsDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
