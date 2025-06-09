import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMappingComponent } from './location-mapping.component';

describe('LocationMappingComponent', () => {
  let component: LocationMappingComponent;
  let fixture: ComponentFixture<LocationMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
