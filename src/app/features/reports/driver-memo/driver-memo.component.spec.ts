import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverMemoComponent } from './driver-memo.component';

describe('DriverMemoComponent', () => {
  let component: DriverMemoComponent;
  let fixture: ComponentFixture<DriverMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverMemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
