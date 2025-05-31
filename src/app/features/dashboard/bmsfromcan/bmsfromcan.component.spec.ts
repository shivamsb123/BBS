import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmsfromcanComponent } from './bmsfromcan.component';

describe('BmsfromcanComponent', () => {
  let component: BmsfromcanComponent;
  let fixture: ComponentFixture<BmsfromcanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmsfromcanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmsfromcanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
