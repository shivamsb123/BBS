import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingGpsComponent } from './missing-gps.component';

describe('MissingGpsComponent', () => {
  let component: MissingGpsComponent;
  let fixture: ComponentFixture<MissingGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingGpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
