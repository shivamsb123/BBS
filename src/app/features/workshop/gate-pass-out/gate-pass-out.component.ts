import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../http-services/shared.service';
import { WorkshopService } from '../services/workshop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-gate-pass-out',
  templateUrl: './gate-pass-out.component.html',
  styleUrls: ['./gate-pass-out.component.scss']
})
export class GatePassOutComponent {

  getOutForm: any;
  selectedValue: any
  vehicleData: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  successMessage: any = 'ADD'
  errorMessage: any = 'Added'
  getPassInList: any;
  vehicleId: any;
  gatePassValue: any;
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  constructor(
    private fb: FormBuilder,
    private shardService: SharedService,
    private workshopService: WorkshopService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    // this.gateInId = this.route.snapshot.paramMap.get("id");
    // if(this.gateInId){
    //   setTimeout(() => {
    //     this.getPassIn()
    //   }, 500);
     
    // }
    this.getPassIn()
    this.setInitialForm()
    this.getVehicleZoneData()
    this.initialTable()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle No.' },
      { key: 'keyValue', val: 'Service Type' },
      { key: 'keyValue', val: 'Keeper NAme' },
      { key: 'keyValue', val: 'In Time' },
      { key: 'keyValue', val: 'Out Time' },

    ]
  }

  setInitialForm() {
    this.getOutForm = this.fb.group({
      vehicleNo: ['', [Validators.required, Validators.pattern('')]],
      out_time: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  GatePassOut(formValue: any) {

    let payload = {
      "ID": null,
      "VehicleID": parseInt(this.vehicleId),
      "ServiceTypeID": parseInt(this.gatePassValue?.serviceTypeID) ,
      "InTime": this.gatePassValue?.inTime ? formatDate(this.gatePassValue?.inTime, 'yyyy/MM/dd HH:mm:ss', 'en-US'):null,
      "OutTime": formValue?.out_time ? formatDate(formValue?.out_time, 'yyyy/MM/dd HH:mm:ss', 'en-US'):null,
      "KeeperID": 75

    }

    // if(this.gateInId){
    //   payload.ID = parseInt(this.gateInId)
    // }

    this.workshopService.createGatePass(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.status == 200) {
        this.alertData = {
          message: `${this.successMessage} Data Successfully`
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        setTimeout(() => {
          this.router.navigateByUrl('/WorkShop/In')
        }, 2000);
      } else {
        this.alertData = {
          message: `Data Not ${this.errorMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    });

  }
  getPassIn() {
    let payload = {

        "ID":null,
        "VehicleID":this.vehicleId ? this.vehicleId : null,
        "Date":null
    }
    this.workshopService.getPassIndata(payload).subscribe((res: any) => {
      this.getPassInList = res?.body;
      this.getPassInList?.forEach((item:any)=>{
        this.gatePassValue = item
      })
    });
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }


  confirm(event: any) {
    if (event.selectType == 'Vehicle') {
      this.vehicleId = event.id
      this.getOutForm.controls['vehicleNo'].setValue(event.id)
      this.getPassIn()
    }
  }

  cancel(){
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.getOutForm.reset()
  }

   /**
* tabel size chage method
* @param event 
*/
onTableSizeChange(event: any): void {
  this.tableSize = parseInt(event.target.value);
  this.page = 1;
}

onTableDataChange(event: any) {
  this.page = event;
};

}


