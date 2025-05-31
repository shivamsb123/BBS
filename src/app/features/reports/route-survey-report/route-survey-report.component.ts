import { Component } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { ExcelFormatService } from '../../http-services/excel-format.service';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AttendanceLocationMapComponent } from '../attendance-location-map/attendance-location-map.component';
import { RoutePlotPopupComponent } from '../../registration/route-plot-popup/route-plot-popup.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-route-survey-report',
  templateUrl: './route-survey-report.component.html',
  styleUrls: ['./route-survey-report.component.scss']
})
export class RouteSurveyReportComponent {
  tableData:any
  isloading = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  selectedValue: any;
  excelData: any;
  routeSurveyForm: any;
  routeList: any;
  routeSurveyData:any
  routeId: any;
  bsModalRef!: BsModalRef;
  searchKeyword:any
  stopArray: any = [];
  selectedRouteName: unknown;
  totalDistanceCount: any;
  constructor(
    private reportService: ReportsService,
    private modalService: BsModalService,
    private excelService: ExcelFormatService, 
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.setInitialTable();
    this.setInitialValue()
    this.getRouteListData()
  }

  setInitialTable() {
    this.tableData = [
      {key:'', value: 'Route Name'},
      {key:'', value: 'Direction'},
      {key:'', value: 'Stop Name'},
      {key:'', value: 'Remarks'},
      {key:'', value: 'Status'},
      {key: '', value: 'Address' },
      {key: '', value: 'Distance' },
      // {key:'', value: 'Image'},
    ]
  }

  setInitialValue() {
    this.routeSurveyForm = this.fb.group({
      routeNo: ['', [Validators.required, Validators.pattern('')]],
      direction: ['', [Validators.required, Validators.pattern('')]],
      fromDate: [new Date(), [Validators.required, Validators.pattern('')]],
      toDate: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }

  selectionChange(){
    if(this.routeSurveyForm.value.direction){
      this.routeSurveyData = []
    }
  }

  confirm(event: any) {
    this.routeId = event.id
    this.selectedRouteName = event.assets_no  
    this.routeSurveyForm.controls['routeNo'].setValue(event.id)
  }

  showReport(formValue:any){
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    if(formValue){
      this.isloading = true;
      let payload = {
        "DeptId":parseInt(localStorage.getItem('dept_id') || ''),
        "RouteId":this.routeId ? parseInt(this.routeId) : 0,
        "Direction":formValue.direction
      }
      this.reportService.routeSurveyReport(payload).subscribe((res: any) => {
        this.totalDistanceCount = res?.body?.total_distance
        this.routeSurveyData= res?.body?.data;        
        this.isloading = false;
        this.stopArray =  this.routeSurveyData?.map((item:any,index:any) => ({
          sequenceNo : index + 1,
          lat: item?.lat,
          lon: item?.lon,
          stopId: item?.stopId,
          stopName: item?.stopName,
        }));       
      })
    }
  }

  showallTrack() {
    const initialState: ModalOptions = {
      initialState: {
        data: this.stopArray,
        routeName: this.selectedRouteName + ' | Total Distance :- ' + new DecimalPipe('en-US').transform(this.totalDistanceCount, '1.2-2')
      },
    };
    this.bsModalRef = this.modalService.show(
      RoutePlotPopupComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );

  }

  // openImage(data:any,image:any) {
  //   const initialState: ModalOptions = {
  //     initialState: {
  //       data: data.stopName,
  //       image: image,
  //       type : 'ROUTE'
  //     },
  //   };
  //   this.bsModalRef = this.modalService.show(
  //     ImagePopupComponent,
  //     Object.assign(initialState, { class: "modal-md modal-dialog-centered" })
  //   );
  // }

  openModal(data: any, type:any) {
    const initialState: ModalOptions = {
      initialState: {
        data: data,
        type: type
      },
    };
    this.bsModalRef = this.modalService.show(
      AttendanceLocationMapComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );
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
    this.routeSurveyForm.reset()
    this.setInitialValue()
    this.routeSurveyData = []
  }

  getRouteListData() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
        "DeptId":parseInt(localStorage.getItem('dept_id') || '')    
    }

    this.reportService.routeSurvey(payload).subscribe((res: any) => {      
      let data = res?.body?.data;
      this.routeList = data?.map((val: any) =>
        newData = {
          value: val?.routeId,
          text: val?.routeName
        }
      )
    })
  }

  ExportTOExcel() {
    this.excelData = this.routeSurveyData.map((item: any,index:any) => {
      {
        return {
          'SR. No.' : index + 1,
           'Route Name': item?.routeName,
           'Direction': item?.direction,
           'Stop Name': item?.stopName,
           'Remarks': item?.remarks,
           'Status': item?.stopStatuName,
           'Address': item?.captureName,

        };
      }
    })

    this.excelService.excelService(this.excelData, 'Route Survey Report')
  }
}
