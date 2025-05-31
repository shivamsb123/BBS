import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { SharedService } from '../../http-services/shared.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { FormateTimeService } from '../../http-services/formate-time.service';
import { ExcelFormatService } from '../../http-services/excel-format.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-geofence',
  templateUrl: './geofence.component.html',
  styleUrls: ['./geofence.component.scss']
})
export class GeofenceComponent implements OnInit {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  vehicleData: any;
  selectedVehicle: any = '';
  geoFanceData: any;
  tableData:any
  isloading = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  selectedValue: { value: string; text: string; };
  excelData: any;
  geofenceForm: any;
  submitted: boolean = false;

  constructor(
    private reportService: ReportsService,
    private shardService: SharedService,
    private NotificationService: NotificationService,
    private formateTime : FormateTimeService,
    private excelService: ExcelFormatService, 
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.getVehicleZoneData();
    this.setInitialTable();
    this.setInitialValue()
  }

  setInitialTable() {
    this.tableData = [
      {key:'', value: 'Vehicle'},
      {key:'', value: 'Geo-fence'},
      {key:'', value: 'From Date'},
      {key:'', value: 'To Date'},
      {key:'', value: 'Duration'},
      {key:'', value: 'Position'},
    ]
  }

  setInitialValue() {
    this.geofenceForm = this.fb.group({
      vehicleNo: ['', [Validators.required, Validators.pattern('')]],
      fromDate: [new Date(), [Validators.required, Validators.pattern('')]],
      toDate: [new Date(), [Validators.required, Validators.pattern('')]],
      selectedArea: ['-1', [Validators.required, Validators.pattern('')]],
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

  confirm(event: any) {
    this.selectedVehicle = event.id
    this.geofenceForm.controls['vehicleNo'].setValue(event.id)
  }
  selectedArea : string = '-1'
  showReport(formValue:any) {
    this.submitted = true
    if(this.selectedVehicle == '') return;
    if(this.selectedArea == ""){

      this.NotificationService.showError(
        'Please select required Field'
      );
      return
    }
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isloading = true;
    let payload = {
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "ID": parseInt(formValue?.vehicleNo),
      "PageNo": 1,
      "PageSize": 1000,
      "FromDate":formatDate(formValue?.fromDate, 'yyyy-MM-dd 00:00:01', 'en-US'), 
      "ToDate":formatDate(formValue?.fromDate, 'yyyy-MM-dd 23:59:59', 'en-US') ,
      "RecordType":parseInt(formValue?.selectedArea)
    }

    this.reportService.geoFance(payload).subscribe((res:any) => {
      this.geoFanceData = res?.body?.data;
      this.isloading = false;
    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.selectedVehicle = '';
    this.geofenceForm.reset()
  }
  selectarea( e: any){
console.log(e.target.value);

  }

  ExportTOExcel() {
    this.excelData = this.geoFanceData.map((item: any) => {
      {
        return {
           'Vehicle': item?.vehiclE_NO,
           'Geo-fence': item?.geO_FENCE,
           'From Date': item?.from,
           'To Date': item?.to,
           'Duration': item?.duration,
           'Position': item?.position,

        };
      }
    })

    this.excelService.excelService(this.excelData, 'Geo Fance Report')
  }

}
