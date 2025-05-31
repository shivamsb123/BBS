import { Component } from '@angular/core';
import { SharedService } from 'src/app/features/http-services/shared.service';

@Component({
  selector: 'app-battery-delink',
  templateUrl: './battery-delink.component.html',
  styleUrls: ['./battery-delink.component.scss']
})
export class BatteryDelinkComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  vehicleData: any;

  constructor (
    private sharedService : SharedService
  ){}

  ngOnInit(): void {
    this.getVehicleZoneData();
    this.setInitialtable()
  }

  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Zone Name' },
      { key: 'keyValue', val: 'Battery Number' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Location Battery' },
      { key: 'keyValue', val: 'Status' },
      { key: 'keyValue', val: 'Removing Status' },
      { key: 'keyValue', val: 'Remove Reason' },
      { key: 'keyValue', val: 'Reason Date' },
      { key: 'keyValue', val: 'Bat Exp Date' },
    ]
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
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
}
