import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { MaintenanceService } from 'src/app/features/maintenance/services/maintenance.service';
@Component({
  selector: 'app-charging-detail-battery',
  templateUrl: './charging-detail-battery.component.html',
  styleUrls: ['./charging-detail-battery.component.scss']
})
export class ChargingDetailBatteryComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  batteryDetailsModalRef: BsModalRef | any
  bsValue = new Date();
  chargeDetailsList: any;
  vehicleData: any;
  constructor(
    private modalService: BsModalService,
    private maintenanceService: MaintenanceService,
    private sharedService: SharedService
   ) {
  }
  ngOnInit(): void {
    this.setInitialtable();
    this.getVehicleZoneData()
    this.getBatteryChargeStatus();
  }

  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Depot Name' },
      { key: 'keyValue', val: 'Battery No' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Battery Removing Date' },
      { key: 'keyValue', val: 'Battery Charging Date' },
      { key: 'keyValue', val: 'Battery Expiry Date' },
      { key: 'keyValue', val: 'Status' },
    ]
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  getBatteryChargeStatus() {
    this.isloading = true;
    let payload = {
      "Depot_ID":46,
      "PageNo":1,
       "PageSize":100,
       "C_ID":0
    }
    this.maintenanceService.batteryChargeStatus(payload).subscribe((res:any) => {
      this.chargeDetailsList = res?.body?.data;
      this.isloading = false;
    })
  }

  confirm(event:any) {

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  };
  onOpenBatteryDetails(template: TemplateRef<any>) {
    this.batteryDetailsModalRef = this.modalService.show(template)
  }

}
