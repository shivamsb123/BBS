import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRCComponent } from './update-rc.component';

describe('UpdateRCComponent', () => {
  let component: UpdateRCComponent;
  let fixture: ComponentFixture<UpdateRCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
