import { Component } from '@angular/core';
import { SharedService } from 'src/app/features/http-services/shared.service';
import * as XLSX from 'xlsx';
import { StockService } from '../../services/stock.service';
@Component({
  selector: 'app-add-bom-module',
  templateUrl: './add-bom-module.component.html',
  styleUrls: ['./add-bom-module.component.scss']
})
export class AddBomModuleComponent {

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  routeList: any;
  shiftList: any;
  driverList: any;
  vehicleData: any;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  isloading: boolean = false;
  viewRosterList: any;
  company: any;
  submitted: boolean = false;
  selectedValue: { value: string; text: string; };
  selectedRouteValue: { value: string; text: string; };
  selectedVehicleValue: { value: string; text: string; }
  selectedDriverValue: { value: string; text: string; }
  unitData: any;
  selectedbaseValue: any

  constructor(
    private shardService: SharedService,
    private stockService: StockService) {
  }


  ngOnInit(): void {
    this.getCompany();
    this.setInitialTable();
    this.getVehicleZoneData()
    this.getUnit()
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Route No' },
      { key: '', value: 'From To' },
      { key: '', value: 'Date Range' },
      { key: '', value: 'Days' },
      { key: '', value: 'Shift: SRN' },
      { key: '', value: 'Depot Out' },
      { key: '', value: 'Depot In' },
      { key: '', value: 'Bus No' },
      { key: '', value: 'Driver Name & Code' }
    ]
  }

  getCompany() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.company = res?.body?.data;
    })
  }

  /**
   * vehicle list here
   */
  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  getUnit() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "BraID": "ADS-B1",
      "Mode": "SELECT"
    }
    this.stockService.unitList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.unitData = data.map((val: any) =>
        newData = {
          value: val?.unitID,
          text: val?.unitName
        }
      )

    })
  }


  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }


  confirm(event: any) {

  }



  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.selectedVehicleValue = {
      value: '',
      text: ''
    }

  }
}
