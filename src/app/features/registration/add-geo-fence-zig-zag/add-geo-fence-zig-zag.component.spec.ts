import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeoFenceZigZagComponent } from './add-geo-fence-zig-zag.component';

describe('AddGeoFenceZigZagComponent', () => {
  let component: AddGeoFenceZigZagComponent;
  let fixture: ComponentFixture<AddGeoFenceZigZagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGeoFenceZigZagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGeoFenceZigZagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
