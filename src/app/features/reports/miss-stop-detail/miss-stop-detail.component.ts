import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../http-services/shared.service';


@Component({
  selector: 'app-miss-stop-detail',
  templateUrl: './miss-stop-detail.component.html',
  styleUrls: ['./miss-stop-detail.component.scss']
})
export class MissStopDetailComponent {
  report: any
  isloading: boolean = false;
  tableData: any;
  missStopList: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  missstopSelected: boolean = false;
  reasonData: any;
  reasonForm: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  missStopReason: any = [];
  type: any
  constructor(
    private modalService: BsModalService,
    private ReportsService: ReportsService,
    private fb: FormBuilder,
    private shardShardService: SharedService
  ) { }

  ngOnInit() {
    console.log(this.type);

    this.filterType = 'all';
    this.initialTable()
    this.getMissedStop();
    this.reasonForm = this.fb.group({
      reasonValue: ['', [Validators.required, Validators.required]]
    })
  }

  initialTable() {
    if (this.type == 'STOPPAGE') {
      this.tableData = [
        { key: 'keyValue', val: 'Stop Name' },
        { key: 'keyValue', val: 'Actual Time Arrival' },
        { key: 'keyValue', val: 'Actual Time Departure' },
      ]
    } else {
      this.tableData = [
        { key: 'keyValue', val: 'Stop Name' },
        { key: 'keyValue', val: 'Status' },
      ]
    }

  }

  getMissedStop() {
    this.isloading = true;
    let payload = {
      "VehicleID": parseInt(this.report.vehicle_Id),
      "RouteID": this.report.routeID,
      "TripID": parseInt(this.report.tripID),
      "Direction": this.report.direction,
      "TripDate": this.report.tripDate ? formatDate(this.report?.tripDate, 'yyyy-MM-dd', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
    }
    this.ReportsService.missStopData(payload).subscribe((res: any) => {
      this.missStopList = res?.body;
      // console.log(this.missStopList, 'misstoplist');

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
    this.modalService.hide();
  }
  filterType: any;

  filter() {
    if (this.filterType == "missStop") {
      this.missStopList = this.missStopList.filter(item => item.ata === "Stop Miss");
      this.missstopSelected = true;
      this.tableData.push({ key: 'keyValue', val: 'Reason Update' });
    }
    else if (this.filterType == "all") {
      this.missstopSelected = false;
      const reasonUpdateIndex = this.tableData.findIndex(column => column.val === 'Reason Update');
      if (reasonUpdateIndex !== -1) {
        this.tableData.splice(reasonUpdateIndex, 1);
      }

      this.getMissedStop()

    }
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }


  onChangeValue(data: any, i: any) {
    let index = this.missStopReason.findIndex((val: any) => val.StopId == data.stopID);
    if (index !== -1) {
      this.missStopReason.forEach((ele: any) => {
        if (ele?.StopId == data.stopID) {
          ele.StopId = data?.stopID,
            ele.Miss_Id = 0,
            ele.Date = "",
            ele.Reason = this.reasonForm.value.reasonValue
        }
        return ele

      })
    } else {
      this.missStopReason.push({
        "StopId": data?.stopID,
        "Miss_Id": 0,
        "Date": "",
        "Reason": this.reasonForm.value.reasonValue
      }
      )
    }

  }

  onAddReason() {
    const pipe = new DatePipe('en-US');
    let originalDate = new Date(this.report?.tripDate);
    let formattedDate = pipe.transform(originalDate, 'yyyy-MM-dd');
    let payload = {
      "Miss_Id": 0,
      "Date": formattedDate,
      "Vehicle": Number(this.report?.vehicle_Id),
      "Shift_type": this.report?.direction,
      "Shift_Id": 0,
      "Trip_Id": parseInt(this.report.tripID),
      "Reason": "",
      "ROUTE_ID": Number(this.report?.routeID),
      "StopId": 0,
      "lisMissStopArrayTable": this.missStopReason
    }

    // console.log("check payload",payload);

    //  return
    this.ReportsService.missStopReason(payload).subscribe((res: any) => {
      if (res.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        setTimeout(() => {
          this.modalService.hide();
        }, 3000);
      } else {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
        setTimeout(() => {
          this.modalService.hide();
        }, 3000);
      }
    })

  }

}
