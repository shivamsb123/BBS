import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissStopComponent } from './miss-stop.component';

describe('MissStopComponent', () => {
  let component: MissStopComponent;
  let fixture: ComponentFixture<MissStopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissStopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
