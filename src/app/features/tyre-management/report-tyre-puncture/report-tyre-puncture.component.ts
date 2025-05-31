import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { TyreService } from '../services/tyre.service';

@Component({
  selector: 'app-report-tyre-puncture',
  templateUrl: './report-tyre-puncture.component.html',
  styleUrls: ['./report-tyre-puncture.component.scss']
})
export class ReportTyrePunctureComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  department: any;
  vehicleData: any;
  puncuteReport: FormGroup
  linkingListArr: any;
  tyrNumberList: any;
  constructor( 
    private sharedService: SharedService,
    private fb : FormBuilder,
    private tyreService: TyreService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  ngOnInit(): void {
    this.setInitialValue()
    this.departmentData();
    this.getTyreNumber()
    this.getVehicleZoneData()
    this.setInitialtable()
  }
  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Tyre No' },
      { key: 'keyValue', val: 'Tyre Make' },
      { key: 'keyValue', val: 'Fitted Date' },
      { key: 'keyValue', val: 'Puncture Date' },
      { key: 'keyValue', val: 'Fitted Km' },
      { key: 'keyValue', val: 'Puncture Km' },
      { key: 'keyValue', val: 'Fitted Tyre Nsd' },
      { key: 'keyValue', val: 'Removal Tyre Nsd' },
      { key: 'keyValue', val: 'Location' },
      { key: 'keyValue', val: 'Place Of Tyre Puncture' },
      { key: 'keyValue', val: 'Remarks' },
    ]
  }

  setInitialValue() {
    this.puncuteReport = this.fb.group({
      vehicleNo: ['',[Validators.required, Validators.pattern('')]],
      tyre_number: ['',[Validators.required, Validators.pattern('')]],
      from_date: [new Date(), [Validators.required, Validators.pattern('')]],
      to_date: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }

  departmentData() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  getTyreNumber() {
    let newData = {
      value:'',
      text:''
    }
    let payload = {
      "Result":""
    }
    this.tyreService.tyreNumber(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.tyrNumberList = data?.map((val:any)=>
      newData = {
        value : val?.tyre_Id,
        text : val?.tyre_No
      })
    })
  }

  confirm(event: any) {
    if (event.selectType == 'Vehicle') {
      this.puncuteReport.controls['vehicleNo'].setValue(event.id)
    } else if(event.selectType == 'tyre'){
      this.puncuteReport.controls['tyre_number'].setValue(event.id)
    }
  }

  getPunctureTyreReport(formValue: any) {
    this.isloading = true;
    let payload = {
      "Vehicle_No": formValue?.vehicleNo,
      "Tyre_No": formValue?.tyre_number,
      "FromDate":formatDate(formValue.from_date, 'yyyy-MM-dd', 'en-US'),
      "ToDate":formatDate(formValue.to_date, 'yyyy-MM-dd', 'en-US'),
    }
    this.tyreService.punctureTyreReport(payload).subscribe((res: any) => {
      this.linkingListArr = res?.body?.data;
      this.isloading = false;
    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  };
}
