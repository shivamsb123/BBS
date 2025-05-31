import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDriveComponent } from './total-drive.component';

describe('TotalDriveComponent', () => {
  let component: TotalDriveComponent;
  let fixture: ComponentFixture<TotalDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalDriveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
