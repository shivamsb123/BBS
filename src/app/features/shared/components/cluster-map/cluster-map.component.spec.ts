import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterMapComponent } from './cluster-map.component';

describe('ClusterMapComponent', () => {
  let component: ClusterMapComponent;
  let fixture: ComponentFixture<ClusterMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClusterMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
