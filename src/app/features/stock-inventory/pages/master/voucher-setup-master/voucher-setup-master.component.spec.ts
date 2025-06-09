import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherSetupMasterComponent } from './voucher-setup-master.component';

describe('VoucherSetupMasterComponent', () => {
  let component: VoucherSetupMasterComponent;
  let fixture: ComponentFixture<VoucherSetupMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherSetupMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherSetupMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
