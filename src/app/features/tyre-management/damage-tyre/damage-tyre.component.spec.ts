import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageTyreComponent } from './damage-tyre.component';

describe('DamageTyreComponent', () => {
  let component: DamageTyreComponent;
  let fixture: ComponentFixture<DamageTyreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageTyreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamageTyreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
