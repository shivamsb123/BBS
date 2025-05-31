import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoasterComponent } from './view-roaster.component';

describe('ViewRoasterComponent', () => {
  let component: ViewRoasterComponent;
  let fixture: ComponentFixture<ViewRoasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRoasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
