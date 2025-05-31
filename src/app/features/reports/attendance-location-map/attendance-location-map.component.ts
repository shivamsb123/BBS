import { Component } from '@angular/core';
import { LAT, LNG } from '../../shared/constant/API_CONSTANT';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-attendance-location-map',
  templateUrl: './attendance-location-map.component.html',
  styleUrls: ['./attendance-location-map.component.scss']
})
export class AttendanceLocationMapComponent {
  centerLatitude = LAT;
  centerLongitude = LNG;
  data: any
  markers: any;
  address: any;
  datetime: any;
  vehicle: any;
  type:any
  constructor(private modalService: BsModalService,) { }
  ngOnInit() {
    console.log("check dagta", this.data, this.type);
    
    if(this.type == 'INTIME') {
      this.address = this.data.inAddress
      this.vehicle = this.data.name
      this.datetime = this.data.inTime
      this.markers = [
        {
          latitude: Number(this.data.inLat),
          longitude: Number(this.data.inLong),
          label: 'A',
          draggable: false,
        }
      ];
    } else if(this.type == 'OUTTime') {
      this.address = this.data.outAddress
      this.vehicle = this.data.name
      this.datetime = this.data.outTime
      this.markers = [
        {
          latitude: Number(this.data.outLat),
          longitude: Number(this.data.outLong),
          label: 'A',
          draggable: false,
        }
      ];
    }else if(this.type == 'ROUTE'){
      this.address = this.data.captureName
      this.vehicle = this.data.routeName
      this.markers = [
        {
          latitude: Number(this.data.lat),
          longitude: Number(this.data.lon),
          label: 'A',
          draggable: false,
        }
      ];
    }

  }
  cancel() {
    this.modalService.hide();
  }

}
