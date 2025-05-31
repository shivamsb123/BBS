import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeldUpComponent } from './held-up.component';

describe('HeldUpComponent', () => {
  let component: HeldUpComponent;
  let fixture: ComponentFixture<HeldUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeldUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeldUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
