import { Component } from '@angular/core';
import { TyreService } from '../services/tyre.service';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-report-tyre-linking',
  templateUrl: './report-tyre-linking.component.html',
  styleUrls: ['./report-tyre-linking.component.scss']
})
export class ReportTyreLinkingComponent {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  isloading: boolean = false;
  searchKeyword: any;
  linkingListArr: any;
  tyreLinkingForm: any;
  vehicleData: any;
  tyrNumberList: any;
  selectedTyreValue: any

  constructor(private tyreService: TyreService,
    private fb: FormBuilder,
    private shardService: SharedService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.getVehicleZoneData()
    this.initialTable();
    this.setInitialValue()
    this.getTyreNumber()
  }

  setInitialValue() {
    this.tyreLinkingForm = this.fb.group({
      vehicleNo: ['', [Validators.required, Validators.pattern('')]],
      tyre_number: ['', [Validators.required, Validators.pattern('')]],
      from_date: [new Date(), [Validators.required, Validators.pattern('')]],
      to_date: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Tyre No ' },
      { key: 'keyValue', val: 'Tyre Make' },
      { key: 'keyValue', val: 'KM Installation ' },
      { key: 'keyValue', val: 'Installation Date ' },
      { key: 'keyValue', val: 'NSD Location' },
      { key: 'keyValue', val: 'Tyre NSD (O)' },
      { key: 'keyValue', val: 'Tyre NSD (M)' },
      { key: 'keyValue', val: 'Tyre NSD (I)' },
      { key: 'keyValue', val: 'Tyre Linking Status' },
    ]
  }

  confirm(event: any) {
    if (event.selectType == 'Vehicle') {
      this.tyreLinkingForm.controls['vehicleNo'].setValue(event.id)
    } else if (event.selectType == 'tyre') {
      this.tyreLinkingForm.controls['tyre_number'].setValue(event.id)
    }
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  };

  getTyreLinkingReport(formValue: any) {
    this.isloading = true;
    let payload = {

      "FromDate": formatDate(formValue.from_date, 'yyyy-MM-dd', 'en-US'),
      "ToDate": formatDate(formValue.to_date, 'yyyy-MM-dd', 'en-US'),
      "Vehicle_No": formValue?.vehicleNo,
      "Tyre_No": formValue?.tyre_number

    }
    this.tyreService.linkingReportList(payload).subscribe((res: any) => {
      this.linkingListArr = res?.body?.data;
      this.isloading = false;
    })
  }

  getTyreNumber() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "Result": ""
    }
    this.tyreService.tyreNumber(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.tyrNumberList = data?.map((val: any) =>
        newData = {
          value: val?.tyre_Id,
          text: val?.tyre_No
        })
    })
  }
}
