import { Component, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-gps-data',
  templateUrl: './gps-data.component.html',
  styleUrls: ['./gps-data.component.scss']
})
export class GPSDataComponent {
  @ViewChild('TABLE') tableList!: ElementRef;

  gpsdata :any ;
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
  user:any
  colorScheme:any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  tableData:any;
  vehiclelistData = {
    trackList: [],
    isloading: false,
    page: 1,
    count: 0,
    tableSize: 25,
    tableSizes: [25, 50, 100],
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
  id:number = 0;
  fsValueData:any = 0;
  mapList: any;
  imageData: any = [
    "../../../../../assets/images/inmotion.png",
    "../../../../../assets/images/bus-stop.png",
    "../../../../../assets/images/bus-not-working.png",
    "../../../../../assets/images/long-stay.png",
  ]
  driverCount: any;
  routeCount:any;
  searchKeyword: any;

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.initialTable();
    this.getdata();
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Driver No' },
      { key: 'keyValue', val: 'Speed' },
      { key: 'keyValue', val: 'Location' },
      { key: 'keyValue', val: 'Last GPS Update' },
      { key: 'keyValue', val: 'Lat' },
      { key: 'keyValue', val: 'Long' },
      { key: 'keyValue', val: 'Route No' },
    ]
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
      page_size: 150,
      location: '',
      trip_start_date: '',
      district: '',
      fs_value: this.fsValueData,
      customer: '',
      depo_name: '',
    };
    this.dashboardService.mapview2(payload).subscribe((res: any) => {
      this.mapList = res?.body?.data?.list_map_view
      this.vehiclelistData.trackList = res?.body?.data?.list_track_sta;

      for (let i = 0; i < this.vehiclelistData.trackList.length; i++) {
        for (let j = i; j < this.imageData.length; j++) {
           this.vehiclelistData.trackList[j]['img'] = this.imageData[j];
        }
      } 

      this.gpsdata = [
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
      ];
      this.vehiclelistData.isloading = false;
      this.getGPSWiseData()
    });

  }

  getGPSWiseData() {
    let data = [];
    let routeData = []
    this.mapList.forEach((val:any) => {
      if(val.driver !== '') {
        data.push(val?.driver)
      }

      if(val?.route !== '') {
        routeData.push(val?.route)
      }
    })
    this.driverCount = data
    this.routeCount = routeData
  }

  selectedMapList(value:any) {
    this.fsValueData = value;
    this.getdata();
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
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableList.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }
}
