import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagementService } from '../services/management.service';
import { formatDate } from '@angular/common';
import { RegistrationService } from '../../registration/services/registration.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';
import { AddInformationComponent } from '../../shared/components/add-information/add-information.component';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-add-roaster',
  templateUrl: './add-roaster.component.html',
  styleUrls: ['./add-roaster.component.scss']
})
export class AddRoasterComponent implements OnInit {
  @ViewChild('TABLE') tableList!: ElementRef;
  @Input() roasterData: any;
  @Output() onConfirm = new EventEmitter()
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  routeList: any;
  addroaster!: FormGroup;
  shiftList: any;
  company: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  isloading: boolean = false;
  tableData: any;
  rId: any;
  driverList: any;
  vehicleData: any;
  addDriver!: FormGroup
  selectedData: any;
  selectType: string = '';
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  submitted: boolean = false;
  bsModalRef?: BsModalRef;
  selectedValue: { value: string; text: string; };
  selectedRouteValue: { value: string; text: string; };
  excelData: any;

  constructor(private sharedService: SharedService,
    private registrationService: RegistrationService,
    private _fb: FormBuilder,
    private managementService: ManagementService,
    private modalService: BsModalService,
    private excelService: ExcelFormatService
    ) {

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }


  ngOnInit(): void {
    this.getCompany()
    this.setInititalValue();
    this.setInitialTable();
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Days Of Week' },
      { key: '', value: 'Serial No.' },
      { key: '', value: 'Shift On' },
      { key: '', value: 'Depot Out' },
      { key: '', value: 'Lunch Start' },
      { key: '', value: 'Lunch End' },
      { key: '', value: 'Depot In' },
      { key: '', value: 'Shift Off' },
    ]
  }


  getCompany() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.company = res?.body?.data;
    })
  }


  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }


  getRouteListData() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "DEPT_ID": parseInt(this.addroaster.value.companyValue),
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

  setInititalValue() {
    this.addroaster = this._fb.group({
      companyValue: ['', [Validators.required, Validators.pattern('')]],
      routeValue: ['', [Validators.required, Validators.pattern('')]],
      shift: ['', [Validators.required, Validators.pattern('')]],
      Weekday: ['WK', [Validators.required, Validators.pattern('')]],
      fromdate: [new Date(), [Validators.required, Validators.pattern('')]],
      todate: [new Date(), [Validators.required, Validators.pattern('')]],
    })


    this.addDriver = this._fb.group({
      driver: ['', [Validators.required, Validators.pattern('')]],
      vehicle: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  /**
   *  register form controls
   */
  get f() {
    return this.addroaster.controls;
  }

  getshiftStatus(formValue: any) {
    this.submitted = true;
    if(formValue.routeValue == '' && formValue.shift == '' && formValue.Weekday == '' && formValue.fromdate == '' && formValue.todate == '') return;
    this.isloading = true;
    let payload = {
      "route_id": parseInt(formValue.routeValue || '') ,
      "shift_type": formValue.shift || '',
      "weekday_type": formValue.Weekday,
      "from_date": formatDate(formValue.fromdate, 'yyyy-MM-dd', 'en-US'),
      "to_date": formatDate(formValue.todate, 'yyyy-MM-dd', 'en-US')
    }    
    this.managementService.ShiftForRoster(payload).subscribe(res => {
      this.shiftList = res?.body?.data;
      this.isloading = false;
    })
  }

  confirm(event: any) {    
    if (event.selectType == 'company') {
      this.routeList = [];
      this.addroaster.controls['companyValue'].setValue(event.id);
      this.getRouteListData();
    } else if (event.selectType == 'route') {
      this.addroaster.controls['routeValue'].setValue(event.id)
    } 

  }

  selectRoster(vehicleData:any, type:any) {    
    this.selectType = type
    this.rId = vehicleData?.r_id;
    this.selectedData = vehicleData
    
    const initialState: ModalOptions = {
      initialState: {
         rosterData : vehicleData,
         toDate: this.addroaster.value.todate,
         fromDate: this.addroaster.value.fromdate,
         dept: this.addroaster.value.companyValue
      },
    };
    this.bsModalRef = this.modalService.show( 
      AddInformationComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
     
    );

    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
       window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (value?.body?.status == 'Success') {
         this.alertData = {
          message: value?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.selectedValue = {
          value: '',
          text: ''
        }
        this.selectedRouteValue = {
          value: '',
          text: ''
        }
        // this.addroaster.reset()
      } else {
        this.alertData = {
          message: value?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
      }
    );
  }

 
  
  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 4000);
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
    this.addroaster.reset()
    
  }

  
  ExportTOExcel() {
    this.excelData = this.shiftList.map((item: any) => {
      {
        return {
          'Days Of Week': item?.days_of_week,
          'Serial No.': item?.snr,
          'Shift On': item?.shift_on,
          'Depot Out': item?.depo_out,
          'Lunch Start': item?.lunch_start,
          'Lunch End': item?.lunch_end,
          'Depot In': item?.depo_in,
          'Shift Off': item?.shift_off,

        };
      }
    })

    this.excelService.excelService(this.excelData, 'Roaster List')
  }
}
