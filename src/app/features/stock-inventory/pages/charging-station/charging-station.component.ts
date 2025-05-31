import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { DatePipe, formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ChargingDeviceComponent } from 'src/app/features/charging/charging-device/charging-device.component';
import * as moment from 'moment';
import { ExcelFormatService } from 'src/app/features/http-services/excel-format.service';


@Component({
  selector: 'app-charging-station',
  templateUrl: './charging-station.component.html',
  styleUrls: ['./charging-station.component.scss']
})
export class ChargingStationComponent implements OnInit {

  hstep = 1;
  mstep = 1;
  isMeridian = false;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 100;
  tableSizes = [25, 50, 100];
  tableData: any;
  vehicleMode: any = 0
  token = 'VgMxIXSes1Ky.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA0NjEzNjAwMTAsImVhdCI6MTcwODIzNzM2MDAxMH0.Jt_RmuOZCsKFiGvzhO590YdCDjyv2Eh32qxBIaVkPRQ'
  inTime = new Date();
  chargingData: any;
  searchKeyword: any;
  chargingForm!: FormGroup
  vehicleData: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  batteryStatusValue: any;
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  submitted: boolean = false;
  selectedValue: any
  successMessage: any = 'Add Data Succesfully'
  errorMessage: any = 'Data Not Added'
  vehiclelistData = {
    trackList: [],
    isloading: false,
    page: 1,
    count: 0,
    tableSize: 100,
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

  timeline = true;
  doughnut = true;
  user: any
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  R_id: any;
  totalDevice: any;
  totalLength: any;
  id: any;
  button: any = 'Add';
  hostId: any;
  alltransactiondata: any;
  deviceId: any;
  bsmodal!: BsModalRef;
  chargingModel:any
  excelData: any;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private fb: FormBuilder,
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router,
    private modalService: BsModalService,
    private datePipe: DatePipe,
    private excelService : ExcelFormatService

  ) { }
  ngOnInit(): void {
    // this.getCharginglist();
    // this.setInitialValue()
    this.setInitialTable();
    // this.getVehicleZoneData();
    // this.getTotalDevice()
    this.getTranscation()

  }

  setInitialValue() {
    this.chargingForm = this.fb.group({
      busNo: ['', [Validators.required, Validators.pattern('')]],
      batterystaus: ['', [Validators.required, Validators.pattern('')]],
      socConsumed: ['', [Validators.required, Validators.pattern('')]],
      depotInTime: [new Date(), [Validators.required, Validators.pattern('')]],
      shift: ['M', [Validators.required, Validators.pattern('')]],
      charger_type: ['', [Validators.required, Validators.pattern('')]],
      // approxTime: [new Date(), [Validators.required, Validators.pattern('')]],
      socBeforeCharging: ['', [Validators.required, Validators.pattern('')]],
      startTime: [new Date(), [Validators.required, Validators.pattern('')]],
      socAfterCharging: ['', [Validators.required, Validators.pattern('')]],
      opretorname: ['', [Validators.required, Validators.pattern('')]],
      kwh: ['', [Validators.required, Validators.pattern('')]],
      Time_consumed: ['', [Validators.required, Validators.pattern('')]],
      endTime: [new Date(), [Validators.required, Validators.pattern('')]],
      startDate: [new Date(), [Validators.required, Validators.pattern('')]],
      endDate: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }

  getTotalDevice() {
    let newData = {
      text: '',
      value: ''
    }
    if (!localStorage.getItem('chargingtoken')) {
      localStorage.setItem('chargingtoken', this.token)
    }

    this.isloading = true;
    let payload = {
      "device_id": "*"
    }
    this.http.post<any>('https://platform.kazam.in/getDeviceState', payload).subscribe(data => {
      let deviceData = data;
      this.totalLength = deviceData.length;
      this.totalDevice = deviceData?.map((val: any) =>
        newData = {
          text: val?.device_id,
          value: val?.device_id
        }
      )
      this.hostId = deviceData[0]?.host_id;
      // this.getTranscation()

      this.isloading = false;
    });

  }

  setInitialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S No' },
      { key: 'keyValue', val: 'Vehicle Id' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Vehicle IMEI' },
      { key: 'keyValue', val: 'SOC' },
      { key: 'keyValue', val: 'Last Update' },
      {key : 'Charging Status', val : 'Charging Status'}

    ]
  }

  getTranscation() {
    this.isloading = true;
    let payload = {      
        "dept_id":19,
        "id":0,
        "user_id":75,
        "page_no":1,
        "page_size":500    
    }
    this.stockService.chargingData(payload).subscribe(data => {
      this.isloading = false;
      this.alltransactiondata = data?.body?.data; 
      this.chargingModel = data?.body?.data?.vehicleChargingModel    
      this.totalDevice = this.alltransactiondata?.listVehicleCharging

    });
  }


  getLatestTransaction() {
    this.alltransactiondata = [];
    if (!localStorage.getItem('chargingtoken')) {
      localStorage.setItem('chargingtoken', this.token)
    }

    this.isloading = true;
    let payload = {
      "device_id": this.deviceId
    }
    this.http.post<any>('https://platform.kazam.in/getLatestTransaction', payload).subscribe(data => {
      this.isloading = false;
      let transValue = data;
      this.alltransactiondata.push(transValue);      

    });
  }

  viewDetail(txnId: any, vehicleNo:any) {
    const initialState: ModalOptions = {
      initialState: {
        tenId: txnId,
        vehicleNo: vehicleNo
      },
    };

    this.bsmodal = this.modalService.show(
      ChargingDeviceComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );

  }




  /**
  * vehicle list here
  */
  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  confirm(event: any) {
    if(event.id) {
      this.deviceId = event.id;
      this.getLatestTransaction()
    } else {
      this.getTranscation()
    }
    // this.chargingForm.controls['busNo'].setValue(event.assets_no);
    // this.getBatteryStatus();
  }

  getBatteryStatus() {
    // let date: any;
    // let time: any
    let dateTime: any
    let payload = {
      "ASSET_NO": this.chargingForm.value.busNo,
      // "SERVER_TIME": formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US')
    }
    this.stockService.vehicleBattery(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      data.forEach((val: any) => {

        // date = val?.serveR_TIME.slice(0, 10).split("-").reverse().join('-');
        // time = val?.serveR_TIME.slice(11, 20)
        dateTime = val?.serveR_TIME ? new Date(val?.serveR_TIME) : new Date()
        this.chargingForm.controls['depotInTime'].setValue(dateTime);
        this.chargingForm.controls['batterystaus'].setValue(val?.soc)
      })

    })

  }

  getCharginglist() {
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": 0

    }
    this.stockService.chargingList(payload).subscribe((res: any) => {
      this.chargingData = res?.body?.data.reverse()
    })
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

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formvalue: any) {
    this.submitted = true;
    if (this.submitted && this.chargingForm.value.statusbeforeCharging > 100 || this.submitted && this.chargingForm.value.statusAfterChargig > 100) return
    let payload = {
      "MODE": this.vehicleMode,
      "id": 0,
      "AssestNo": formvalue?.busNo,
      "Depo_InTime": formatDate(formvalue?.depotInTime, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      "DepoInSOC": formvalue?.batterystaus.toString(),
      "OnTripSocConsumed": formvalue?.socConsumed,
      "ChargerType": formvalue?.charger_type,
      "SocBefore": formvalue?.socBeforeCharging,
      "StartTime": formatDate(formvalue?.startTime, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      "SocAfter": formvalue?.socAfterCharging,
      "OperatorName": formvalue?.opretorname,
      "EndTime": formatDate(formvalue?.endTime, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      "KWH": formvalue?.kwh,
      "ShiftType": formvalue?.shift,
      "TimeConsumed": formvalue?.Time_consumed
    }
    if (this.vehicleMode == 1) {
      payload["id"] = this.id
    }

    this.stockService.addCharging(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.status == 200) {
        this.alertData = {
          message: this.successMessage
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.getCharginglist();
        this.stopAlert();
      } else {
        this.alertData = {
          message: this.errorMessage,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.chargingForm.reset()
  }

  updateCharging(id: any) {
    this.successMessage = 'Update Data Successfully'
    this.errorMessage = 'Data Not Updated'
    this.id = id
    this.vehicleMode = 1
    this.button = 'Update'
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.chargingData.forEach((val: any) => {
      if (this.id == val?.id) {
        let newChargingValue = this.vehicleData?.filter((ele: any) => ele?.text == val?.assestNo);
        newChargingValue.forEach((data: any) => {
          this.selectedValue = data;
        });

        this.chargingForm = this.fb.group({
          busNo: ['', [Validators.required, Validators.pattern('')]],
          batterystaus: [val?.batteryStatus, [Validators.required, Validators.pattern('')]],
          socConsumed: [val?.socConsumed, [Validators.required, Validators.pattern('')]],
          depotInTime: [new Date(val?.depo_InTime), [Validators.required, Validators.pattern('')]],
          shift: [val?.shiftType, [Validators.required, Validators.pattern('')]],
          charger_type: [val?.chargerType, [Validators.required, Validators.pattern('')]],
          // approxTime: [new Date(), [Validators.required, Validators.pattern('')]],
          socBeforeCharging: [val?.socBefore, [Validators.required, Validators.pattern('')]],
          startTime: [new Date(val?.startTime), [Validators.required, Validators.pattern('')]],
          socAfterCharging: [val?.socAfter, [Validators.required, Validators.pattern('')]],
          opretorname: [val?.operatorName, [Validators.required, Validators.pattern('')]],
          kwh: [val?.kwh, [Validators.required, Validators.pattern('')]],
          Time_consumed: [val?.timeConsumed, [Validators.required, Validators.pattern('')]],
          endTime: [new Date(val?.endTime), [Validators.required, Validators.pattern('')]],

        })
        this.chargingForm.controls['busNo'].setValue(this.selectedValue.text)

      }
    })
  }

  transactionData(path: any, id: any) {
    this.router.navigateByUrl(path.replace("id", id))
  }



  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.chargingForm.reset()
  }

  ExportTOExcel() {
    this.excelData = this.alltransactiondata?.listVehicleCharging.map((item: any) => {
      {
        return {
          'S No' : item?.srNo,
          'Vehicle Id' : item?.vehicleId,
          'Vehicle No' : item?.vehicleNo,
          'Vehicle IMEI' : item?.vehicleIMEI,
          'SOC' : item?.soc,
          'Last Update' : item?.lastDateTime,
          'Charging Status': item?.chargingStatus == 1 ? 'Charging' : 'Not Charging'
        };
      }
    })

    this.excelService.excelService(this.excelData, 'Charging Station')
  }
}
