import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../services/registration.service';
import { LAT, LNG } from '../../shared/constant/API_CONSTANT';
import { TrackingService } from '../../tracking/tracking.service';
import { ReportsService } from '../../reports/services/reports.service';
import { BookType } from 'xlsx';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-route-fancing',
  templateUrl: './route-fancing.component.html',
  styleUrls: ['./route-fancing.component.scss']
})
export class RouteFancingComponent {
  department: any;
  departmentId: any;
  routeList: any;
  centerLatitude = LAT;
  centerLongitude = LNG;
  map: google.maps.Map<HTMLElement> | any;
  selectedCorner: any;
  zoomvalue: number = 13;
  routetId: any;
  listVehicleStopDetailsformap: any;
  directionsRenderer: google.maps.DirectionsRenderer;
  polyline: any;
  markers: google.maps.Marker[] = [];
  mapOptions: any;
  drawingManager: google.maps.drawing.DrawingManager | any;
  drawnPolygon: google.maps.Polygon | any;
  polygonCoordinates: google.maps.LatLng[] | any;
  cornerMarkers: google.maps.Marker[] = [];
  mapcorner: boolean = false;
  currentInfoWindow: google.maps.InfoWindow | null = null;
  marker: any;
  selectedCorners: any;
  routeFanceName: any
  status: number = 1;
  selectedValue: any;
  selectedRouteValue: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  isloading: Boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any
  fencingData: any;
  public showFullFancing: { [key: number]: boolean } = {};

  constructor(
    private shardService: SharedService,
    private registrationService: RegistrationService,
    private trackingService: TrackingService,
    private reportService: ReportsService,
    private viewportScroller: ViewportScroller

  ) { }

  ngOnInit() {
    this.setInitialTable();
    this.getFencingData();
    this.initializeMap(LAT, LNG, this.zoomvalue)
    this.departmentData();
    this.getRouteList();

  }

  setInitialTable() {
    this.tableData = [
      { key: '', val: 'Route No.' },
      { key: '', val: 'Route Name' },
      { key: '', val: 'Route Color' },
      { key: '', val: 'Fencing Data' },
    ]
  }

  initializeMap(lat: any, long: any, zoomvalue: any) {
    const mapOptions = {
      center: { lat: lat, lng: long }, // India's center coordinates
      zoom: zoomvalue,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    this.map = new google.maps.Map(document.getElementById('route') as HTMLDivElement, mapOptions);
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
        this.selectedCorner = (this.polygonCoordinates)
        this.mapcorner = true;
        this.addCornerMarkers();
      }
    });
  }

  addCornerMarkers() {
    if (this.polygonCoordinates && this.polygonCoordinates.length > 0) {
      this.polygonCoordinates.forEach((coordinate: google.maps.LatLng, index: number) => {
        // this.buttonText ='Get remove Coordinates';
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
      this.modifycordinate()
    }
  }

  clearCornerMarkers() {
    this.cornerMarkers.forEach((marker: google.maps.Marker) => {
      marker.setMap(null);
    });

    this.cornerMarkers = [];
  }

  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data
    });
  }

  confirm(event: any) {
    if (event.selectType == 'Department') {
      this.departmentId = event.id;
    } else {
      this.routetId = event.id;
      this.getRouteOnMap()
    }
  }


  getRouteList() {
    let newData = {
      value: "",
      text: ""
    }

    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "Page_No": 1,
      "Page_Size": 100,
      "Flag": 1,
      "bStatus": 1
    }

    this.registrationService.routeList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.routeList = data.map((val: any) =>
        newData = {
          value: val?.routE_ID,
          text: val?.routE_NAME
        }
      )
    })
  }

  onMapReady(map: any) {
    this.map = map;
    // this.mockDirections()
  }

  getRouteOnMap() {
    let payload = {
      route_id: this.routetId,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
    }
    this.trackingService.getStopData(payload).subscribe((res: any) => {
      // console.log("check stop details", this.listVehicleStopDetails);
      this.listVehicleStopDetailsformap = res?.body?.data;
      this.initializeMap(this.listVehicleStopDetailsformap[0]?.lat, this.listVehicleStopDetailsformap[0]?.lon, this.zoomvalue)


      this.plotStopsOnGoogleMap()
    })
  }

  /**
  * route stop plot in map
  */
  plotStopsOnGoogleMap() {
    let currentInfoWindow: google.maps.InfoWindow;
    const pathCoordinates = [];

    this.listVehicleStopDetailsformap?.forEach(stop => {
      const iconSize = new google.maps.Size(20, 20);
      const marker = new google.maps.Marker({
        position: { lat: stop.lat, lng: stop.lon },
        map: this.map,
        title: stop.stopName,
        icon: {
          url: 'assets/images/stop-icon.png',
          scaledSize: iconSize
        }
      });

      pathCoordinates.push({ lat: stop.lat, lng: stop.lon }); // Add coordinates to the path

      const infoWindowContent = `
        <div>
          <h3>${stop.stopName}</h3>
          <p>Stop ID: ${stop.stopId}</p>
          <!-- Add more details as needed -->
        </div>
      `;
      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });
      marker.addListener('click', () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
        }
        infoWindow.open(this.map, marker);
        currentInfoWindow = infoWindow;
      });
    });

    // Create a polyline and set its path
    const polyline = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true, // Indicates if the path should be geodesic (curved lines)
      strokeColor: '#0B32CCD4', // Color of the polyline
      strokeOpacity: 1.0, // Opacity of the polyline
      strokeWeight: 4 // Width of the polyline
    });

    // Set the polyline on the map
    polyline.setMap(this.map);
  }

  modifycordinate() {
    let data: any = []
    this.selectedCorner?.forEach((ele: any) => {
      data.push(`${ele.lat()}  ${ele.lng()}`);
    })

    data.push(`${this.selectedCorner[0].lat()}  ${this.selectedCorner[0].lng()}`)
    return this.selectedCorners = data.join();

  }

  deletePolygon() {
    if (this.drawnPolygon) {
      this.drawnPolygon.setMap(null); // Remove the drawn polygon from the map
      this.clearCornerMarkers(); // Remove corner markers
      this.drawnPolygon = null;
      this.polygonCoordinates = null;
      this.selectedCorner = ("")
    }
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }



  onAddRecord() {
    let payload = {
      DeptId: Number(this.departmentId),
      RouteId: Number(this.routetId),
      Fencing_Data: this.selectedCorner ? this.selectedCorners : '',
      IsActive: Number(this.status)
    }
    this.reportService.routeFance(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.cancel();
        this.getFencingData();
      } else {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }

    })

  }

  removeRoutePolyline() {
    this.initializeMap(LAT, LNG, this.zoomvalue)
  }

  cancel() {
    this.deletePolygon();
    this.removeRoutePolyline()
    this.listVehicleStopDetailsformap = null
    this.selectedCorner = "";
    this.status = 1;
    this.selectedValue = {
      text: '',
      value: ''
    }
    this.selectedRouteValue = {
      text: '',
      value: ''
    }
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

  getFencingData() {
    this.isloading = true
    let payload = {
      "DeptId": 19,
      "RouteId": 0
    }
    this.registrationService.fencingList(payload).subscribe((res: any) => {
      this.isloading = false
      this.fencingData = res?.body?.data;

    })
  }

  // getColorData(color: any) {
  //   let newColor = color.split('_')
  //   console.log("check new color", newColor);
  //   return newColor[1]
  // }

  toggleDescription(id: number): void {    
    this.showFullFancing[id] = !this.showFullFancing[id];
  }

  showRouteFancingOnMap(data: any) {
    let newRouteValue = this.routeList?.filter((ele: any) => ele?.value == data?.routeId );
        
    newRouteValue.forEach((data: any) => {  
      this.selectedRouteValue = data
    });
    this.routetId = data?.routeId;
    this.selectedCorner = data?.fencing_Data
    // this.getRouteOnMap()
    this.mapcorner = false;
    this.viewportScroller.scrollToPosition([0, 0]);


     this.initializeMap(LAT, LNG, this.zoomvalue)
    // this.stateId = data?.stateID
    const corners = data?.fencing_Data;

    if (corners) {
      const polygonCoordinates = corners.split(',').map((corner: string) => {
        const letvalue = corner.trim().split(' ').filter((str) => str !== '');
        const [lat, lng] = letvalue
                       
        return new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
      });

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
            </div>
            `;
            // <button type="button" class="btn btn-danger" (click)="deleteNode(${index})">Delete</button>

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



}
