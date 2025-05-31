import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelFormatService } from '../../http-services/excel-format.service';
import { SharedService } from '../../http-services/shared.service';
import { ReportsService } from '../services/reports.service';
import { NotificationService } from '../../http-services/notification.service';

@Component({
  selector: 'app-soc-change-report',
  templateUrl: './soc-change-report.component.html',
  styleUrls: ['./soc-change-report.component.scss']
})
export class SocChangeReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  currentDate = new Date()
  tableData: any;
  odometerReport: any
  vehicleData: any;
  selectedValue: any
  selectedVehicle: any;
  socChangeForm: any
  driverList: any;
  data: any;
  excelData: any;
  searchKeyword: any;
  constructor(private ReportsService: ReportsService,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private NotificationService: NotificationService,
    private excelService: ExcelFormatService
  ) {

  }

  ngOnInit(): void {
    this.setInitialtableData()
    this.setSpeedVehicleForm();
    this.getVehicleZoneData()

  }

  setInitialtableData() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle No.' },
      { key: 'keyValue', val: 'Start Time' },
      { key: 'keyValue', val: 'End Time' },
      { key: 'keyValue', val: 'Duration' },
      { key: 'keyValue', val: 'Start Soc' },
      { key: 'keyValue', val: 'End Soc' },
      { key: 'keyValue', val: 'Difference' },

    ]
  }

  setSpeedVehicleForm() {
    this.socChangeForm = this.fb.group({
      date: [new Date(), [Validators.required, Validators.pattern('')]],

    })
  }
  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }
  showReport(formValue: any) {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isloading = true;
    let payload = {
      "ID": this.selectedVehicle,
      "TimeRecorded": formatDate(formValue?.date, 'yyyy-MM-dd', 'en-US'),
    }
    this.ReportsService.socChangeReport(payload).subscribe((res: any) => {
      this.data = res?.body?.data;
      console.log(this.data);
      this.isloading = false;
    })
  }


  confirm(event: any) {
    this.data = []
    this.selectedVehicle = event.id
  }

  /**
* tabel size chage method
* @param event 
*/
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };

  ExportTOExcel() {
    this.excelData = this.data.map((item: any) => {
      {
        return {
          'Vehicle No.': item?.v_no,
          'Start Time': formatDate(item?.start_datetime,'yyyy-MM-dd HH:mm:ss', 'en-US'),
          'End Time': formatDate(item?.end_datetime,'yyyy-MM-dd HH:mm:ss', 'en-US'),
          'Duration': item?.total_duration,
          'Start Soc': item?.miN_SOC,
          'End Soc': item?.maX_SOC,
          'Difference': item?.difF_SOC,

        };
      }
    })

    this.excelService.excelService(this.excelData, 'Soc Change Report')
  }
}
