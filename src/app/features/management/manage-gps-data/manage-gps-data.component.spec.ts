import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGpsDataComponent } from './manage-gps-data.component';

describe('ManageGpsDataComponent', () => {
  let component: ManageGpsDataComponent;
  let fixture: ComponentFixture<ManageGpsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGpsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGpsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
