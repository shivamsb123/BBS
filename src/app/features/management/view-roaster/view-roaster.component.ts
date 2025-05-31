import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../http-services/shared.service';
import { ManagementService } from '../services/management.service';
import { formatDate } from '@angular/common';
import { RegistrationService } from '../../registration/services/registration.service';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-view-roaster',
  templateUrl: './view-roaster.component.html',
  styleUrls: ['./view-roaster.component.scss']
})
export class ViewRoasterComponent {
  @ViewChild('TABLE') tableList!: ElementRef;

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  routeList: any;
  Viewroaster!: FormGroup;
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
  selectedVehicleValue : { value: string; text: string; }
  selectedDriverValue: { value: string; text: string; }
  excelData: any;

  constructor(private sharedService: SharedService,
    private registrationService: RegistrationService,
    private _fb: FormBuilder,
    private managementService: ManagementService,
    private shardService: SharedService,
    private excelService: ExcelFormatService
    ) {

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }


  ngOnInit(): void {
    // this.getRouteDetail();
    this.getCompany();
    this.getDriverDetail()
    this.setInititalValue();
    this.setInitialTable();
    this.getVehicleZoneData()

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

  getRouteListData() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "DEPT_ID": parseInt(this.Viewroaster.value.companyValue),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "Page_No": 1,
      "Page_Size": 100,
      "Flag": 1,
      "bStatus": 1
    }

    this.registrationService.routeListData(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      if (data && data.length > 0) { }
      this.routeList = data.map((val: any) =>
        newData = {
          value: val?.routE_ID,
          text: val?.routE_NAME +' /' + val?.routE_NO
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

  getDriverDetail() {
    this.sharedService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
    })

  }
  setInititalValue() {
    this.Viewroaster = this._fb.group({
      companyValue: ['', [Validators.required, Validators.pattern('')]],
      driver: ['', [Validators.required, Validators.pattern('')]],
      vehicle: ['', [Validators.required, Validators.pattern('')]],
      route: ['', [Validators.required, Validators.pattern('')]],
      shift: ['M', [Validators.required, Validators.pattern('')]],
      Weekday: ['WK', [Validators.required, Validators.pattern('')]],
      fromdate: [new Date(), [Validators.required, Validators.pattern('')]],
      todate: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }

  get f() {
    return this.Viewroaster.controls;
  }


  confirm(event: any) {
    if (event.selectType == 'company') {
      this.Viewroaster.controls['companyValue'].setValue(event.id);
      this.routeList = [];
      this.getRouteListData();
    } else if (event.selectType == 'driver') {
      this.Viewroaster.controls['driver'].setValue(event.id)
    } else if (event.selectType == 'Vehicle') {
      this.Viewroaster.controls['vehicle'].setValue(event.id)
    } else {
      this.Viewroaster.controls['route'].setValue(event.id)
    }
  }


  getshiftStatus(formvalue: any) {
    this.submitted = true;
    if(formvalue.route == '' && formvalue.shift=='' && formvalue.Weekday == '' && formvalue.fromdate=='' && formvalue.todate == '' && formvalue.driver == '' && formvalue.vehicle == '') return;
    this.isloading = true;
    let payload = {
      "route_id": formvalue.route ? parseInt(formvalue.route || '') : 0,
      "shift_type": formvalue.shift,
      "weekday_type": formvalue.Weekday,
      "from_date": formatDate(formvalue.fromdate, 'yyyy-MM-dd', 'en-US'),
      "to_date": formatDate(formvalue.todate, 'yyyy-MM-dd', 'en-US'),
      "dept_id": parseInt(formvalue.companyValue),
      "driver_id":  formvalue.driver ? parseInt(formvalue.driver || '') : 0,
      "vehicle_id": formvalue.vehicle ? parseInt(formvalue.vehicle || '') : 0
    }    

    this.managementService.viewRosterList(payload).subscribe((res:any) => {
      this.viewRosterList =  res?.body?.data;
      this.isloading = false
    })
  }

  cancel(){
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.selectedRouteValue = {
      value: '',
      text: ''
    }
    this.selectedVehicleValue = {
      value: '',
      text: ''
    }
    this.selectedDriverValue = {
      value: '',
      text: ''
    }
    this.Viewroaster.reset()
  }

  
  ExportTOExcel() {
    this.excelData = this.viewRosterList.map((item: any) => {
      {
        return {
          'Route No': item?.route_no,
          'From To': item?.from_date,
          'Date Range': item?.to_date + ' To ' + item?.from_date,
          'Days': item?.days_of_week,
          'Shift: SRN': item?.shift_type + ':' + item?.snr,
          'Depot Out': item?.depo_out,
          'Depot In': item?.depo_in,
          'Bus No': item?.vehicle_no,
          'Driver Name & Code': item?.driver_code + ' ' + item?.driver_name ,

        };
      }
    })

    this.excelService.excelService(this.excelData, 'Roaster List')
  }
}

