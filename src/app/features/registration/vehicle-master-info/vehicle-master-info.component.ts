import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-vehicle-master-info',
  templateUrl: './vehicle-master-info.component.html',
  styleUrls: ['./vehicle-master-info.component.scss']
})
export class VehicleMasterInfoComponent {
  vehicleDetail:any
constructor(private modalService: BsModalService,
){

}

ngOnInit(){}

 cancel() {
    this.modalService.hide();

  }
}
