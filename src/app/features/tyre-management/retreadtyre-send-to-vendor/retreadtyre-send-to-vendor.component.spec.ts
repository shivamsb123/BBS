import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetreadtyreSendToVendorComponent } from './retreadtyre-send-to-vendor.component';

describe('RetreadtyreSendToVendorComponent', () => {
  let component: RetreadtyreSendToVendorComponent;
  let fixture: ComponentFixture<RetreadtyreSendToVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetreadtyreSendToVendorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetreadtyreSendToVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
