import * as XLSX from 'xlsx';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { SessionService } from '../../http-services/session.service';
import { DashboardService } from '../services/dashboard.service';
import { ExcelFormatService } from '../../http-services/excel-format.service';
@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent {
  currentTimeInterval:any = null;
  @ViewChild('TABLE') tableList!: ElementRef;

  tableData:any
  vehiclelistData = {
    isloading: false,
    page: 1,
    count: 0,
    tableSize: 25,
    tableSizes: [25, 50, 100],
  };
  mapList:any;
  searchKeyword:any;
  excelData: any;


  constructor(
    private sharedService: SharedService,
    private sessionService: SessionService,
    private dashboardService: DashboardService,
    private excelService: ExcelFormatService
  ) {}
  ngOnInit(): void {
    this.initialTable();
    this.getdata();
  }

  initialTable() {
    this.tableData = [
      {key: 'keyValue',val: 'S NO'},
      {key: 'keyValue',val: 'Date'},
      {key: 'keyValue',val: 'Shift'},
      {key: 'keyValue',val: 'Route No_Srn / Bus No'},
      {key: 'keyValue',val: 'Driver'},
      // {key: 'keyValue',val: 'Bus No'},
      {key: 'keyValue',val: 'Shift On'},
      {key: 'keyValue',val: 'Depo Out'},
      {key: 'keyValue',val: 'Depo Out - Odo & SOC'},
      {key: 'keyValue',val: 'Depo IN'},
      {key: 'keyValue',val: 'Depo IN - Odo & SOC'},
      {key: 'keyValue',val: 'Depo Out Status'},
      {key: 'keyValue',val: 'Depo In Status'},
      {key: 'keyValue',val: 'Shift Off Status'},
      {key: 'keyValue',val: 'Shift On Status'},
      {key: 'keyValue',val: 'Shift Off'},
      {key: 'keyValue',val: 'Schedule Km'},
      {key: 'keyValue',val: 'GPS Km'},
      {key: 'keyValue',val: 'Odometer Km'},
      {key: 'keyValue',val: 'Route Violation KM'},
      {key: 'keyValue',val: 'Total Vehicles'},
      {key: 'keyValue',val: 'Total Drivers'},

    ]
  }

  getdata() {
    this.vehiclelistData.isloading = true;
    let payload = {  
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      "mode": 1
    };
    this.dashboardService.shiftdata(payload).subscribe((res: any) => {
      this.mapList = res?.body?.data;
      this.vehiclelistData.isloading = false;
    });
  }

    /**
   * tabel size chage method
   * @param event 
   */
    onTableSizeChange(event: any): void {
      this.vehiclelistData.tableSize = event.target.value;
      this.vehiclelistData.page = 1;
    }
  
    /**
     * table data change
     * @param event 
     */
    onTableDataChange(event: any) {
      this.vehiclelistData.page = event;
    };


    ExportTOExcel() {
      this.excelData = this.mapList.map((item: any) => {
        {
          return {
            'S NO': item?.serial_no,
            'Date': item?.date,
            'Shift': item?.shift_type,
            'Route No_Srn / Bus No': item?.route_no + ' / ' + item?.asset_no,
            'Driver': item?.driver_name_sch === item?.driver_name ? item?.driver_name : item?.driver_name + ' ' + item?.driver_name_sch,
            'Shift On': !item?.shift_on_sch ? item?.shift_on : item?.shift_on_sch + ' ' + item?.shift_on_sch,
            'Depo Out': !item?.depo_out_sch ? item?.depo_out : item?.depo_out_sch + ' ' + item?.depo_out,
            'Depo Out - Odo & SOC': item?.depo_out + ' - ' + item?.depo_out_odo + ' & ' + item?.depo_out_soc,
            'Depo IN': item?.depo_in_sch,
            'Depo IN - Odo & SOC': item?.depo_in_sch + ' - ' + item?.depo_in_odo + ' & ' + item?.depo_in_soc,
            'Depo Out Status': item?.depo_out_status,
            'Depo In Status': item?.depo_in_status,
            'Shift Off Status': item?.shift_off_status,
            'Shift On Status': item?.shift_on_status,
            'Shift Off': item?.shift_off_sch,
            'Schedule Km': item?.scheduled_km,
            'GPS Km': item?.gps_km,
            'Odometer Km': item?.odometer_km,
            'Route Violation KM': item?.route_violation_km,
            'Total Vehicles': item?.total_vehicles,
            'Total Drivers': item?.total_drivers,
  
          };
        }
      })
  
      this.excelService.excelService(this.excelData, 'Roaster List')
    }
  
}
