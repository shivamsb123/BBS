import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanDataComponent } from './can-data.component';

describe('CanDataComponent', () => {
  let component: CanDataComponent;
  let fixture: ComponentFixture<CanDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
