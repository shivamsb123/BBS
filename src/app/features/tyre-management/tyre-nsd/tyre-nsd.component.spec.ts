import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreNsdComponent } from './tyre-nsd.component';

describe('TyreNsdComponent', () => {
  let component: TyreNsdComponent;
  let fixture: ComponentFixture<TyreNsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreNsdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreNsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
