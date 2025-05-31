import { Component, HostListener } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NewGeofenceComponent } from '../new-geofence/new-geofence.component';
import { ViewportScroller } from '@angular/common';
import { LAT, LNG } from '../../shared/constant/API_CONSTANT';

interface Marker {
  lat: number;
  lng: number;
  iconUrl: string;
}

@Component({
  selector: 'app-add-geo-fence-zig-zag',
  templateUrl: './add-geo-fence-zig-zag.component.html',
  styleUrls: ['./add-geo-fence-zig-zag.component.scss']
})
export class AddGeoFenceZigZagComponent {
  isloading: boolean = false;
  map: google.maps.Map | any;
  drawingManager: google.maps.drawing.DrawingManager | any;
  drawnPolygon: google.maps.Polygon | any;
  polygonCoordinates: google.maps.LatLng[] | any;
  cornerMarkers: google.maps.Marker[] = [];
  currentInfoWindow: google.maps.InfoWindow | null = null;
  department: any;
  geofencelist: any;
  newDta: any;
  stateId: any;
  marker: any;
  lat = 20.3428;
  long = 85.7377
  zoomvalue = 5
  geolistdata: any;
  officeid: any;
  departmentId: any;
  addGeoFance!: FormGroup
  stopId: any;
  bsModalRef?: BsModalRef;
  tableData: any;
  page = 1;
  count = 0;
  buttonText ='Get remove Coordinates';
  tableSize = 25;
  tableSizes = [25, 50, 10];
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  selectedCorners: any;
  mapcorner: boolean = false;
  selectedID: number = 0;
  button: string = 'Add Record'
  Selectpolygon: google.maps.Polygon;
  selectedValue:any

  constructor(private shardService: SharedService,
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private modalService: BsModalService,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit() {
    
    this.initializeMap(LAT, LNG, this.zoomvalue);
    this.departmentData();
    this.geoFenceData();
    this.setInitialTable();

    this.setInitialValue();
  }

  setInitialValue() {
    this.addGeoFance = this.fb.group({
      state: ['', [Validators.required, Validators.pattern('')]],
      GeoFanceName: ['', [Validators.required, Validators.pattern('')]],
      selectedCorner: ['', [Validators.required, Validators.pattern('')]],
      status: ["1", [Validators.required, Validators.pattern('')]],
    })
  }

  initializeMap(lat: any, long: any, zoomvalue: any) {
    const mapOptions = {
      center: { lat: lat, lng: long }, // India's center coordinates
      zoom: zoomvalue,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLDivElement, mapOptions);
    this.marker = new google.maps.Marker({
      position: { lat, lng: long },
      map: this.map,
      icon: {
        url: '/assets/mapicon.png', // Replace with the URL of your custom icon
        scaledSize: new google.maps.Size(30, 30), // Adjust the size of the icon
      },
    });
    this.initializeDrawingManager();
  }

  initializeDrawingManager() {
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      },
      polygonOptions: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      }
    });

    this.drawingManager.setMap(this.map);

    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: any) => {
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        if (this.drawnPolygon) {
          this.drawnPolygon.setMap(null); // Remove the previously drawn polygon
          this.clearCornerMarkers(); // Remove the corner markers
        }

        this.drawnPolygon = event.overlay as google.maps.Polygon;
        this.polygonCoordinates = this.drawnPolygon.getPath().getArray();
        this.addGeoFance.controls['selectedCorner'].setValue(this.polygonCoordinates)
        this.mapcorner = true;
        this.addCornerMarkers();
      }
    });
  }
  isClockwise(polygon: google.maps.Polygon): boolean {
    const path = polygon.getPath().getArray();
    let sum = 0;
  
    for (let i = 0; i < path.length - 1; i++) {
      const p1 = path[i];
      const p2 = path[i + 1];
      sum += (p2.lng() - p1.lng()) * (p2.lat() + p1.lat());
    }
  
    return sum > 0;
  }
  addCornerMarkers() {
    if (this.polygonCoordinates && this.polygonCoordinates.length > 0) {
      this.polygonCoordinates.forEach((coordinate: google.maps.LatLng, index: number) => {
        console.log("check cordinate", coordinate);
        this.buttonText ='Get remove Coordinates';
        const marker = new google.maps.Marker({
          position: coordinate,
          map: this.map,
          icon: {
            url: '/assets/mapicon.png', // Replace with the URL of your custom icon
            scaledSize: new google.maps.Size(30, 30), // Adjust the size of the icon
          },
        });

        const infoWindowContent = `
          <div>
            <p>Latitude: ${coordinate.lat()}</p>
            <p>Longitude: ${coordinate.lng()}</p>
            <button type="button" class="btn btn-danger" (click)="deleteNode(${index})">Delete</button>
          </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent
        });

        marker.addListener('click', () => {
          // Close the previous info window, if any
          if (this.currentInfoWindow) {
            this.currentInfoWindow.close();
          }

          infoWindow.open(this.map, marker);
          this.currentInfoWindow = infoWindow;
        });

        this.cornerMarkers.push(marker);
      });
    }
  }

  clearCornerMarkers() {
    this.cornerMarkers.forEach((marker: google.maps.Marker) => {
      marker.setMap(null);
    });

    this.cornerMarkers = [];
  }

  getPolygonCoordinates() {
    if (this.polygonCoordinates && this.polygonCoordinates.length > 0) {
      console.log('Polygon Coordinates:', this.polygonCoordinates);
    } else {
      console.log('No polygon has been drawn yet.');
    }
  }

  deleteNode(index: number) {
    console.log('index', index);

    if (index >= 0 && index < this.polygonCoordinates.length) {
      this.polygonCoordinates.splice(index, 1); // Remove the coordinate from the polygonCoordinates array
      this.cornerMarkers[index].setMap(null); // Remove the marker from the map
      this.cornerMarkers.splice(index, 1); // Remove the marker from the cornerMarkers array
    }
  }
  clear(){
    if(this.buttonText.includes("Clear")){
      console.log('removing polygon for update');
      
      this.Selectpolygon.setMap(null); 
      this.clearCornerMarkers(); 
      this.Selectpolygon = null;
      this.polygonCoordinates = null;
      this.addGeoFance.controls['selectedCorner'].setValue("")
     
     
    }
  
  }
  deletePolygon() {
    
    if (this.drawnPolygon  && this.buttonText.includes("remove")) {
      this.drawnPolygon.setMap(null); // Remove the drawn polygon from the map
      this.clearCornerMarkers(); // Remove corner markers
      this.drawnPolygon = null;
      this.polygonCoordinates = null;
      this.addGeoFance.controls['selectedCorner'].setValue("")
    }
  }

  searchKeyword: string = ""
  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data
    });
  }
  
  confirm(event: any) {
    this.departmentId = event.id;
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
    this.geolist()
  }
  statelistdiv: boolean = false;

  filterFunction() {
    if (this.searchKeyword !== "") {
      this.statelistdiv = true;
      this.geoFenceData()
    }
  }

  @HostListener("document:click")

  clickedOut() {
    this.statelistdiv = false;
  }

  onSelectData(data: any) {
    this.deletePolygon();
    this.addGeoFance.reset();
    this.addGeoFance.controls['status'].setValue('1')
    this.mapcorner = false;
    this.stopId = data.stopid.toString()
    this.addGeoFance.controls['state'].setValue(data.stopName)
    this.addGeoFance.controls['GeoFanceName'].setValue(data.stopName)

    this.lat = data?.lat
    this.long = data?.lon;
    this.zoomvalue = 16;

    this.initializeMap(this.lat, this.long, this.zoomvalue)
    this.searchKeyword = data?.stop_Type_Name + '-' + data?.stopName;
    // this.stateId = data?.stateID
    const corners = data?.corners;

    if (corners) {
      const polygonCoordinates = corners.split(',').map((corner: string) => {
        const letvalue = corner.trim().split(' ').filter((str) => str !== '');
        const [lat, lng] = letvalue

        return new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
      });
      this.addGeoFance.controls['selectedCorner'].setValue(corners);

      // Remove the previously drawn polygon and corner markers


      // Create a new polygon with the given coordinates
      const polygon = new google.maps.Polygon({
        paths: polygonCoordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });

      polygon.setMap(this.map);

      // Add markers with icons on every node of the geofence
      polygonCoordinates.forEach((coordinate: google.maps.LatLng, index: number) => {
        const marker = new google.maps.Marker({
          position: coordinate,
          map: this.map,
          icon: {
            url: '/assets/mapicon.png', // Replace with the URL of your custom icon
            scaledSize: new google.maps.Size(30, 30), // Adjust the size of the icon
          }
        });

        const infoWindowContent = `
          <div>
            <p>Latitude: ${coordinate.lat()}</p>
            <p>Longitude: ${coordinate.lng()}</p>
            <button type="button" class="btn btn-danger" (click)="deleteNode(${index})">Delete</button>
          </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent
        });

        marker.addListener('click', () => {
          // Close the previous info window, if any
          if (this.currentInfoWindow) {
            this.currentInfoWindow.close();
          }

          infoWindow.open(this.map, marker);
          this.currentInfoWindow = infoWindow;
        });

        this.cornerMarkers.push(marker);
      });

      // Set the map bounds to fit the polygon
      const bounds = new google.maps.LatLngBounds();
      polygonCoordinates.forEach((coordinate: google.maps.LatLng) => {
        bounds.extend(coordinate);
      });
      this.map.fitBounds(bounds);
    }
  }


  geoFenceData() {
    let newDta: any;
    let payload = {
      "UserID": parseInt(localStorage.getItem('user_Id') || ''),
      "StopName": this.searchKeyword,
      "PageNo": 1,
      "PageSize": 5000,
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "Stop_ID": 0
    }

    this.registrationService.geofencelist(payload).subscribe((res: any) => {
      this.geofencelist = res?.body?.data
    });
  }
  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Geo-Fence Name' },
      { key: '', value: 'Latitude-Longitude' },
      { key: '', value: 'Status' },
      { key: '', value: 'Custom Location' },
    ]
  }
  geolist() {
    let payload = {
      "UserID": parseInt(localStorage.getItem('user_Id') || ''),
      "StopName": "",
      "PageNo": 1,
      "PageSize": 100,
      "DEPT_ID": parseInt(this.departmentId) || '',
      "Stop_ID": 0

    }
    this.registrationService.listofgeofence(payload).subscribe((res: any) => {
      this.geolistdata = res?.body?.data;
    });
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }


  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  modifycordinate(value: any) {
    let data: any = []
    console.log("check value ", value);

    value?.forEach((ele: any) => {
      data.push(`${ele.lat()}  ${ele.lng()}`);
    })
    data.push(`${value[0].lat()}  ${value[0].lng()}`)
    return this.selectedCorners = data.join();

  }

  submit(formValue: any) {
    let payload = {
      "StopId": this.selectedID,
      "StopNo": this.stopId.toString(),
      "StopName": formValue.GeoFanceName,
      "Lat": 0,
      "Lon": 0,
      "DEPT_ID": parseInt(this.departmentId),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "Radius": 0,
      "Corners": this.mapcorner ? this.modifycordinate(formValue.selectedCorner) : formValue.selectedCorner,
      "STATUS": parseInt(formValue.status),
      "StopId_Location": this.stopId ? Number(this.stopId) : 0,
      "StopID_NEW": 0,
      "Result": ""
    }

    this.registrationService.updateGeofence(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.button = 'Add Record';
        this.selectedID = 0;
        this.selectedValue = {
          value: '',
          text: ''
        }
        this.addGeoFance.reset();
        this.addGeoFance.controls['status'].setValue('1')
        this.deletePolygon();
        this.lat = null;
        this.long = null;
        this.geolist();
      } else {
        this.alertData = {
          message: 'Geo-Fence Not Added',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }
  openGeofenceModal() {

    const initialState: ModalOptions = {
      initialState: {


      },
    };
    this.bsModalRef = this.modalService.show(
      NewGeofenceComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );
  }

  cancel() {
    this.addGeoFance.reset();
    this.selectedValue = {
      value: '', 
      text: ''
    };
    this.button = 'Add Record';
    this.selectedID = 0;
    this.addGeoFance.controls['status'].setValue('1')
  }

  selectedGeofance(geofance: any) {
    console.log("check geofance", geofance);
    this.button = 'Update Record';
    this.buttonText ='Clear existing polygon for update';
    this.deletePolygon();
    this.addGeoFance.reset();
    this.addGeoFance.controls['status'].setValue('1');
    this.selectedID = geofance?.stop_ID
    this.viewportScroller.scrollToPosition([0, 0]);
    let selectedStop: any
    this.geofencelist?.forEach((val: any) => {
      if (val?.stopid == geofance?.stop_ID) {
        selectedStop = val?.stop_Type_Name + '-' + val?.stopName;
        this.stopId = geofance?.stopId_Location
      }
    })
    this.searchKeyword = selectedStop;
    this.addGeoFance = this.fb.group({
      state: [selectedStop, [Validators.required, Validators.pattern('')]],
      GeoFanceName: [geofance?.stopName, [Validators.required, Validators.pattern('')]],
      selectedCorner: [geofance?.corners, [Validators.required, Validators.pattern('')]],
      status: [geofance?.status_ID.toString(), [Validators.required, Validators.pattern('')]],
    })

    this.lat = geofance?.lat
    this.long = geofance?.lon;
    this.zoomvalue = 16;

    this.initializeMap(this.lat, this.long, this.zoomvalue)
    const corners = geofance?.corners
    if (corners) {
      const selctedpolygonCoordinates = corners.split(',').map((corner: string) => {
        const letvalue = corner.trim().split(' ').filter((str) => str !== '');
        const [lat, lng] = letvalue

        return new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
      });


      this.addGeoFance.controls['selectedCorner'].setValue(geofance?.corners);

      // Remove the previously drawn polygon and corner markers
      this.deletePolygon();

      // Create a new polygon with the given coordinates
       this.Selectpolygon = new google.maps.Polygon({
        paths: selctedpolygonCoordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });


      this.Selectpolygon.setMap(this.map);

      // Add markers with icons on every node of the geofence
      selctedpolygonCoordinates.forEach((coordinate: google.maps.LatLng, index: number) => {
        const marker = new google.maps.Marker({
          position: coordinate,
          map: this.map,
          icon: {
            url: '/assets/mapicon.png', // Replace with the URL of your custom icon
            scaledSize: new google.maps.Size(30, 30), // Adjust the size of the icon
          }
        });

        const infoWindowContent = `
          <div>
            <p>Latitude: ${coordinate.lat()}</p>
            <p>Longitude: ${coordinate.lng()}</p>
            <button type="button" class="btn btn-danger" (click)="deleteNode(${index})">Delete</button>
          </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent
        });

        marker.addListener('click', () => {
          // Close the previous info window, if any
          if (this.currentInfoWindow) {
            this.currentInfoWindow.close();
          }

          infoWindow.open(this.map, marker);
          this.currentInfoWindow = infoWindow;
        });

        this.cornerMarkers.push(marker);
      });

      // Set the map bounds to fit the polygon
      const selectbounds = new google.maps.LatLngBounds();
      selctedpolygonCoordinates.forEach((coordinate: google.maps.LatLng) => {

        selectbounds?.extend(coordinate);
      });


      this.map.fitBounds(selectbounds);
    }
  }
}

