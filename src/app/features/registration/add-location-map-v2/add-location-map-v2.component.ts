import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../services/registration.service';
import * as L from 'leaflet';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-location-map-v2',
  templateUrl: './add-location-map-v2.component.html',
  styleUrls: ['./add-location-map-v2.component.scss']
})
export class AddLocationMapV2Component {

  addLocation!: FormGroup
  company: any;
  stopList: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  stopName: any;
  map: L.Map | any;
  polyline: L.Polyline | null = null;
  animatedMarker: L.Marker | any = null;

  constructor(
    private fb : FormBuilder,
    private shardService : SharedService,
    private ragistrationService : RegistrationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private route :  Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }  
    this.getInitialValue();
    this.getCompany();
    this.getStopTypeList()
  }

  getInitialValue() {
    this.addLocation = this.fb.group({
      departmentNo: ['', [Validators.required, Validators.pattern('')]],
      stopType: ['', [Validators.required, Validators.pattern('')]],
      locationName: ['', [Validators.required, Validators.pattern('')]],
      lat: ['', [Validators.required]],
      long: ['', [Validators.required]],
    })
  }

  async initializeMap(): Promise<void> {
    const leafletModule = await import('leaflet');
    this.map = L.map('map_canvas', {
      center: [20.29573, 85.82476],
      zoom: 5,
      zoomControl: false,
    });

    const osmLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 21,
      }
    );

    const satelliteLayer = L.tileLayer(
      'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
      {
        attribution: 'Imagery © <a href="http://maps.google.com">Google</a>',
        maxZoom: 21,
      }
    );

    const googleLayer = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps',
      }
    ).addTo(this.map);

    // Esri Terrain and OpenTopoMap as alternatives to Stamen Terrain
    const osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
    });;

    const openTopoLayer = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)',
        maxZoom: 17,
      }
    );

    const baseMaps = {
      'Google Map': googleLayer,
      OpenStreetMap: osmLayer,
      Satellite: satelliteLayer,
      'osmHOT': osmHOT,
      'Graphic': openTopoLayer,
    };

    L.control.layers(baseMaps).addTo(this.map);
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);
  }

  getCompany() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.company = res?.body?.data;
    })
  }

  getStopTypeList() {
    let newData: any
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "User_ID": parseInt(localStorage.getItem('user_Id') || '')
    }
    this.ragistrationService.stopTypeList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.stopList = data.map((val: any) =>
        newData = {
          value: val?.stopType_ID,
          text: val?.stopType_Name
        }
      )
    })
  }

  confirm(event: any) {
    if (event.selectType == 'Stop_Type') {
      this.addLocation.controls['stopType'].setValue(event.id);
      this.stopName = event.assets_no
    }else if(event.selectType == 'company'){
      this.addLocation.controls['departmentNo'].setValue(event.id);
    }else {
      this.addLocation.controls['ditrict'].setValue(event.id);
    }
  }

  submit(formvalue: any) {       
    let payload = {
      "StopID": 0,
      "StopNo": "",
      "StopName":formvalue.locationName,
      "Lat":parseFloat(formvalue.lat) ,
      "Lon": parseFloat( formvalue.long),
      "DEPT_ID": parseInt(formvalue.departmentNo || ''),
      "ZONE_ID": 0,
      "BLOCK_ID": 0,
      "STATUS": 1,
      "StopType": formvalue.stopType ? parseInt(formvalue.stopType || '') : 0,
      "State_ID": 0,
      "District_ID": 0,
      "StopID_NEW": "0",
      "Result": ""
    }
 
    this.ragistrationService.addLocation(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.addLocation.reset();
        setTimeout(() => {          
          this.route.navigateByUrl('/Registration/Location_Master')
        }, 2000);

      } else {
          this.alertData = {
            message: res?.body?.alert,
          };
          this.alertType = "danger";
          this.alertTrigger = true;
          this.stopAlert();
        }
    })
  }

  cancel() {
    this.addLocation.reset()
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  changeLngValue(event: any): void {
    const latitude = parseFloat(this.addLocation.value.lat);
    const longitude = parseFloat(event.target.value);
    const place = this.addLocation.value.locationName

    if (latitude && longitude) {
      const latLng = [latitude, longitude] as L.LatLngExpression;

      this.map.setView(latLng, 13);

      if (this.animatedMarker) {
        this.animatedMarker.setLatLng(latLng);
      } else {
        this.animatedMarker = L.marker(latLng).addTo(this.map);
      }

      this.animatedMarker.bindPopup(`Place: ${place}`).openPopup();
    }
  }
}
