import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsSearchControlComponent } from './dms-search-control.component';

describe('DmsSearchControlComponent', () => {
  let component: DmsSearchControlComponent;
  let fixture: ComponentFixture<DmsSearchControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmsSearchControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmsSearchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
