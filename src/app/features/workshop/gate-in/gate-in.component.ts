import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkshopService } from '../services/workshop.service';
import { SharedService } from '../../http-services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-gate-in',
  templateUrl: './gate-in.component.html',
  styleUrls: ['./gate-in.component.scss']
})
export class GateInComponent {
  getInForm: any;
  serviceList: any;
  selectedValue: any
  serviceType: any;
  vehicleData: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  successMessage: any = 'ADD'
  errorMessage: any = 'Added'
  gateInId: string;
  getPassInList: any;
  selectedSeriviceValue:any
  button: any = 'Add';
  constructor(
    private fb: FormBuilder,
    private shardService: SharedService,
    private workshopService: WorkshopService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.gateInId = this.route.snapshot.paramMap.get("id");
    if(this.gateInId){
      setTimeout(() => {
        this.getPassIn()
      }, 500);
     
    }
    this.setInitialForm()
    this.getVehicleZoneData()
    this.getSerivice()
  }


  setInitialForm() {
    this.getInForm = this.fb.group({
      vehicleNo: ['', [Validators.required, Validators.pattern('')]],
      service_type: ['', [Validators.required, Validators.pattern('')]],
      in_time: [new Date(), [Validators.required, Validators.pattern('')]],
      keeper_name: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  getSerivice() {
    let newData = {
      value: '',
      text: ''
    }
    this.workshopService.getServiceType().subscribe((res: any) => {
      let data = res?.body;
      this.serviceList = data?.map((val: any) =>
        newData = {
          value: val?.Key,
          text: val?.Value
        })

    });
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  createGatePassIn(formValue: any) {
    let payload = {
      "ID": null,
      "VehicleID": parseInt(formValue.vehicleNo),
      "ServiceTypeID": parseInt(formValue.service_type) ,
      "InTime": formValue?.in_time ? formatDate(formValue?.in_time, 'yyyy/MM/dd HH:mm:ss', 'en-US'):null,
      "OutTime": null,
      "KeeperID": 75

    }

    if(this.gateInId){
      payload.ID = parseInt(this.gateInId)
    }

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

    this.successMessage = 'Update'
    this.errorMessage = 'Updated'
    this.button = 'Update'
    let payload = {

        "ID":this.gateInId,
        "VehicleID":null,
        "Date":null
    }
    this.workshopService.getPassIndata(payload).subscribe((res: any) => {
      let data = res?.body;
      this.getPassInList = data?.forEach((val:any)=>{

        let newVehicleValue = this.vehicleData?.filter((ele: any) => ele?.value == val?.vehicleID);
        newVehicleValue.forEach((data: any) => {  
          this.selectedValue = data
        });

        let serviceValue = this.serviceList?.filter((ele: any) => ele?.text == val?.serviceType);        
        serviceValue?.forEach((data: any) => {
          this.selectedSeriviceValue = data
        });

        let formatGateDate = val.inTime.slice(0, 10).split('-').reverse().join('-');
        let formatGateTime = val.inTime.slice(11, 16);

        this.getInForm = this.fb.group({
          vehicleNo: ['', [Validators.required, Validators.pattern('')]],
          service_type: ['', [Validators.required, Validators.pattern('')]],
          in_time: [new Date(`${formatGateDate} ${formatGateTime}`), [Validators.required, Validators.pattern('')]],
          keeper_name: ['', [Validators.required, Validators.pattern('')]]
        })
        this.getInForm.controls['vehicleNo'].setValue(val?.vehicleID)
      })
      
    });
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }


  confirm(event: any) {
    this.serviceType = event.assets_no
    if (event.selectType == 'Vehicle') {
      this.getInForm.controls['vehicleNo'].setValue(event.id)
    } else if (event.selectType == 'Service') {
      this.getInForm.controls['service_type'].setValue(event.id)
    }
  }

  cancel(){
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.selectedSeriviceValue = {
      value: '',
      text: ''
    }
    this.getInForm.reset()
  }

}
