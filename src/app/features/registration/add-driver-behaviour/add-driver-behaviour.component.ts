import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-add-driver-behaviour',
  templateUrl: './add-driver-behaviour.component.html',
  styleUrls: ['./add-driver-behaviour.component.scss']
})
export class AddDriverBehaviourComponent {
  vehicleData: any;
  selectedValue:any;
  driverList: any;
  selectedDriver:any

  constructor(
    private sharedService : SharedService
  ) {}
  
  ngOnInit() {
    this.getVehicleZoneData();
    this.getDriverDetail()
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  getDriverDetail() {
    this.sharedService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
    })
  }

  confirm(event:any) {

  }

}
