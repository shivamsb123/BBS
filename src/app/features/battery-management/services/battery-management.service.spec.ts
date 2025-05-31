import { TestBed } from '@angular/core/testing';

import { BatteryManagementService } from './battery-management.service';

describe('BatteryManagementService', () => {
  let service: BatteryManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatteryManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
