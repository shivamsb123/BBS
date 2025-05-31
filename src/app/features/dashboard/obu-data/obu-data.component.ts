import { Component, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { ExcelFormatService } from '../../http-services/excel-format.service';


@Component({
  selector: 'app-obu-data',
  templateUrl: './obu-data.component.html',
  styleUrls: ['./obu-data.component.scss']
})
export class OBUDataComponent {
  @ViewChild('TABLE') tableList!: ElementRef;

  leaveRequest: any;
  obudata: any ;
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  doughnut = true;
  user: any
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  tableData: any;
  refreshSecond = [
    { id: '1', value: "Refresh In 60 Sec" },
    { id: '2', value: "Refresh In 120 Sec" },
    { id: '3', value: "Refresh In 180 Sec" },
    { id: '4', value: "Do Not Refresh" },
  ];
  refreshValue = "Do Not Refresh";
  currentTimeInterval: any = null;
  vehiclelistData = {
    trackList: [],
    isloading: false,
    page: 1,
    count: 0,
    tableSize: 200,
    location: [
      {
        latitude: 0,
        longitude: 0,
        place: '',
        vehicle: '',
        Time: '',
        last_GPS: '',
        Speed: '',
      }
    ]
  };
  mapList: any;
  id: number = 0;
  fsValueData: any = 0;
  deviceData: any;
  searchKeyword: any;
  imageData: any = [
    "../../../../../assets/images/inmotion.png",
    "../../../../../assets/images/bus-stop.png",
    "../../../../../assets/images/bus-not-working.png",
    "../../../../../assets/images/long-stay.png",
    "../../../../../assets/images/slow-bus.png"
  ]
  chargingCount: any;
  currentCountValue: any;
  voltageValue: any;
  socValue: any;
  excelData: any;

  constructor(
    private dashboardService: DashboardService,
    private router:Router,
    private excelService : ExcelFormatService
  ) { }

  ngOnInit() {
    this.initialTable();
    this.getdata()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO', rowspan: 2 },
      { key: 'keyValue', val: 'Vehicle No.', rowspan: 2 },
      { key: 'keyValue', val: 'Speed', rowspan: 2 },
      { key: 'keyValue', val: 'Odometer', rowspan: 2},
      { key: 'keyValue', val: 'Motor Rotate Speed (RPM)', rowspan: 2},
      { key: 'keyValue', val: 'Gear Status', rowspan: 2 },
      { key: 'keyValue', val: 'Accelerator Pedal', rowspan: 2 },
      { key: 'keyValue', val: 'Break Pedal', rowspan: 2 },
      { key: 'keyValue', val: 'DC Status', rowspan: 2 },
    ];
  }

  getdata() {
    this.vehiclelistData.isloading = true;
    let payload = {
      id: this.id,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      zone_id: 0,
      vehicle_type: 0,
      vehicle_no: '',
      page_no: 1,
      page_size: 500,
      location: "0",
      trip_start_date: '',
      district: "0",
      fs_value: this.fsValueData,
      customer: '',
      depo_name: '',
    };

    if (this.deviceData?.device) {
      payload['device_id'] = this.deviceData?.device
    }

    this.dashboardService.allCanData(payload).subscribe((res:any) => {
      this.mapList = res?.body?.data?.canDataList
      this.vehiclelistData.trackList = res?.body?.data?.listBoxData;
      this.vehiclelistData.count =  res?.body?.data?.totalRecords
      for (let i = 0; i < this.vehiclelistData.trackList.length; i++) {
        for (let j = i; j < this.imageData.length; j++) {
           this.vehiclelistData.trackList[j]['img'] = this.imageData[j];
        }
      }   
      this.leaveRequest = [
        {
          "name": "In Motion",
          "value": this.vehiclelistData.trackList[0]?.total,
        },
        {
          "name": "Stop Vehicle",
          "value": this.vehiclelistData.trackList[1]?.total,
        },
        {
          "name": "Not Working",
          "value": this.vehiclelistData.trackList[2]?.total,
        },
        {
          "name": "Long Stay",
          "value": this.vehiclelistData.trackList[3]?.total,
        },
        {
          "name": "Slow Movement",
          "value": this.vehiclelistData.trackList[4]?.total,
        },    
      ];
      
      this.vehiclelistData.isloading = false;
      this.getOBUData()
    });
  }

  vehicleTypeWithoutSpaces(data:any){
    return data ? data.replace(/\s+/g, '') : 'NA';
  }

  getOBUData() {
    let chargingData :any =[];
    let currentCount:any = 0;
    let voltageCount:any = 0;
    let socCount:any = 0;
    this.mapList.forEach((val:any) => {
      if(val?.chargingStatus !== 'Not Charging' && val?.chargingStatus !== '') {
        chargingData.push(val?.chargingStatus)
      }

      if(val?.totalCurrent >= "0") {
        currentCount += Number(val?.totalCurrent) 
      }

      if(val?.totalVoltage >= "0") {
        voltageCount += Number(val?.totalVoltage)
      }

      if(val?.soc >=0) {
        socCount += Number(val?.soc)
      }

    })
    this.chargingCount = chargingData;
    this.currentCountValue =  parseFloat(currentCount).toFixed(2);
    this.voltageValue =  parseFloat(voltageCount).toFixed(2);
    this.socValue =  parseFloat(socCount).toFixed(2);
    this.obudata = [
      {
        "name": "Total Device",
        "value": this.mapList?.length,
      },
      {
        "name": "Total SOC",
        "value":  this.socValue,
      },
      {
        "name": "Currently Charging",
        "value": this.chargingCount?.length,
      },
      {
        "name": "Total Voltage",
        "value": this.voltageValue,
      },
      {
        "name": "Total Current",
        "value": this.currentCountValue,
      },
  
    ];
    
  }

  selectedMapList(value:any) {
    this.fsValueData = value;
    this.getdata();
  }

  getBatteryIcon(battery: number): string {
    if (battery >= 75) {
      return `<i class="fa fa-battery-full" aria-hidden="true" style="color: green;"></i> ${battery}%`;
    } else if (battery >= 60) {
      return `<i class="fa fa-battery-three-quarters" aria-hidden="true" style="color: yellow;"></i> ${battery}%`;
    } else if (battery >= 45) {
      return `<i class="fa fa-battery-half" aria-hidden="true" style="color: orange;"></i> ${battery}%`;
    } else if (battery >= 20) {
      return `<i class="fa fa-battery-quarter" aria-hidden="true" style="color: red;"></i> ${battery}%`;
    } else {
      return `<i class="fa fa-battery-empty" aria-hidden="true" style="color: red;"></i> ${battery}%`;
    }
  }
  

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
          'S NO': item?.snNo,
          'Vehicle No.': item?.vehicleNo,
          'Last Update': item?.timeRecorded,
          'Speed': item?.speed ? item.speed + ' km/h' : '0',
          'SOC': item?.soc,
          'Odometer':item?.odometerGPS ? item.odometerGPS + ' km' : '0',
          'Mileage': item?.mileage ? item.mileage + ' km' : '0',
          'Motor Rotate Speed (RPM)': item?.motorRotateSpeed,
          'Total Voltage (V)': item?.totalVoltage,
          'Total Current (A)': item?.totalCurrent,
          'Charging Status': item?.chargingStatus,
          'Gear Status': item?.gearStatus,
          'Accelerator Pedal': item?.acceleratorPedal,
          'Break Pedal': item?.brakePedalStatus == "1" ? 'Break' : '',
          'DC Status': item?.dcDCStatus,
          'Max Battery Temp. (°C)': item?.maxBatteryTemp,
          'Max Battery Voltage (V)': item?.maxBatteryVoltage,
          'Min Battery Temp (°C)': item?.minBatteryTemp,
          'Min Battery Voltage (V)': item?.minBatteryVoltage,
          'Battery Failure Level': item?.powerBatteryFailureLevel,
          'Battery Temperature (°C) (1-8)': item?.battery1Temp +', '+item?.battery2Temp +', ' +item?.battery3Temp +', '+item?.battery4Temp+', '+item?.battery5Temp+', '+item?.battery6Temp+', '+item?.battery7Temp+', '+item?.battery8Temp,
          'Battery Cell Voltage (V) (1-4)': item?.batteryCell1Voltage +', '+item?.batteryCell2Voltage +', ' +item?.batteryCell3Voltage +', '+item?.batteryCell4Voltage ,
        };
      }
    })

    this.excelService.excelService(this.excelData, 'CAN Data View')
  }

  
  navigateUrl(path:any,data:any ){
    let url = path.replace(':id', data?.vehicleId)
    this.router.navigateByUrl(url,{ state: data})
  }

  onTablValue(id:any) {
    this.vehiclelistData.page = 1
  }
}
