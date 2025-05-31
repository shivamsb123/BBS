import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutSheldingComponent } from './out-shelding.component';

describe('OutSheldingComponent', () => {
  let component: OutSheldingComponent;
  let fixture: ComponentFixture<OutSheldingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutSheldingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutSheldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
