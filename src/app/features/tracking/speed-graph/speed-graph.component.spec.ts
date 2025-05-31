import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedGraphComponent } from './speed-graph.component';

describe('SpeedGraphComponent', () => {
  let component: SpeedGraphComponent;
  let fixture: ComponentFixture<SpeedGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeedGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
