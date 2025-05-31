import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllfromcanComponent } from './allfromcan.component';

describe('AllfromcanComponent', () => {
  let component: AllfromcanComponent;
  let fixture: ComponentFixture<AllfromcanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllfromcanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllfromcanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
