import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRouteRegistrationComponent } from './new-route-registration.component';

describe('NewRouteRegistrationComponent', () => {
  let component: NewRouteRegistrationComponent;
  let fixture: ComponentFixture<NewRouteRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRouteRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRouteRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
