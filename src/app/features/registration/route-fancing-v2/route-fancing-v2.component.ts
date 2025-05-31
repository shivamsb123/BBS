import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../services/registration.service';
import { LAT, LNG } from '../../shared/constant/API_CONSTANT';
import { TrackingService } from '../../tracking/tracking.service';
import { ReportsService } from '../../reports/services/reports.service';
import { BookType } from 'xlsx';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import * as L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

@Component({
  selector: 'app-route-fancing-v2',
  templateUrl: './route-fancing-v2.component.html',
  styleUrls: ['./route-fancing-v2.component.scss']
})
export class RouteFancingV2Component {
  department: any;
  departmentId: any;
  routeList: any;
  selectedCorner: any;
  zoomvalue: number = 13;
  routetId: any;
  listVehicleStopDetailsformap: any;
  mapcorner: boolean = false;
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
  map: L.Map | any;
  polyline: L.Polyline | null = null;
  marker: L.Marker | any = null;
  polygon: L.Polygon | null = null; // Variable to hold the polygon
  cornerMarkers: L.Marker[] = [];

  constructor(
    private shardService: SharedService,
    private registrationService: RegistrationService,
    private trackingService: TrackingService,
    private reportService: ReportsService,
    private viewportScroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: Object,

  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
    this.setInitialTable();
    this.getFencingData();
    this.departmentData();
    this.getRouteList();
  }

  async initializeMap(): Promise<void> {
    try {
      const L = await import('leaflet');
      const LeafletDraw = await import('leaflet-draw'); 
  
      // Initialize the map
      this.map = L.map('map_canvas', {
        center: [20.29573, 85.82476],
        zoom: 5,
        zoomControl: false,
      });
  
      // Define tile layers
      const osmLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 21,
        }
      );
  
      const satelliteLayer = L.tileLayer(
        'https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
        {
          attribution: 'Imagery © <a href="http://maps.google.com">Google</a>',
          maxZoom: 21,
        }
      );
  
      const googleLayer = L.tileLayer(
        'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        {
          maxZoom: 21,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          attribution: '&copy; Google Maps',
        }
      ).addTo(this.map);
  
      const osmHOT = L.tileLayer(
        'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          attribution:
            '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France',
        }
      );
  
      const openTopoLayer = L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        {
          attribution:
            'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)',
          maxZoom: 17,
        }
      );
  
      // Base map layers
      const baseMaps = {
        'Google Map': googleLayer,
        OpenStreetMap: osmLayer,
        Satellite: satelliteLayer,
        osmHOT: osmHOT,
        Graphic: openTopoLayer,
      };
  
      // Adding controls
      L.control.layers(baseMaps, {}, { position: 'topright' }).addTo(this.map);
      L.control
        .zoom({
          position: 'bottomright',
        })
        .addTo(this.map);
  
      const drawnFeatures = new L.FeatureGroup();
      this.map.addLayer(drawnFeatures);
  
      const drawControl = new (L.Control.Draw as any)({
        draw: {
          polyline: true,
          polygon: false,
          rectangle: false,
          circle: false,
          marker: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: drawnFeatures,
          remove: true,
        },
      });
      this.map.addControl(drawControl);
  
      // Function to format coordinates and update form value
      const updateShapeDetails = (layer: any, type: string, typeValue:any) => {
         this.clearMap()

        let shapeDetails: any = { type };
        if (type === 'polygon' || type === 'polyline') {
          shapeDetails.coordinates = layer.getLatLngs();
        }  else if (type === 'rectangle') {
          const bounds = layer.getBounds();
          const sw = bounds.getSouthWest();
          const se = bounds.getSouthEast();
          const nw = bounds.getNorthWest();
          const ne = bounds.getNorthEast();
          shapeDetails.coordinates = [sw, se, ne, nw, sw];
        }

        console.log(shapeDetails.coordinates);
        let coord :any
        if(typeValue == 'Add') {
         coord = shapeDetails.coordinates
        } else if(typeValue == 'update') {
          coord = shapeDetails.coordinates[0]
        }
        
  
        const formattedCoordinates = Array.isArray(coord)
          ? coord
              .map((point: any) => `${point.lat} ${point.lng}`)
              .join(',')
          : `${shapeDetails.coordinates.lat} ${shapeDetails.coordinates.lng}`;
  
        this.selectedCorner = formattedCoordinates
      };
  
      // Event for when a shape is created
      this.map.on('draw:created', (e: any) => {
        const layer = e.layer;
        drawnFeatures.clearLayers();
        drawnFeatures.addLayer(layer);
        updateShapeDetails(layer, e.layerType, 'Add');
      });
  
      // Event for when a shape is edited
      this.map.on('draw:edited', (e: any) => {
        e.layers.eachLayer((layer: any) => {
          updateShapeDetails(layer, layer instanceof L.Polygon ? 'polygon' : 'rectangle',"update");
        });
      });
    } catch (error) {
      console.error('Failed to initialize the map:', error);
    }
  }

  setInitialTable() {
    this.tableData = [
      { key: '', val: 'Route No.' },
      { key: '', val: 'Route Name' },
      { key: '', val: 'Route Color' },
      { key: '', val: 'Fencing Data' },
    ]
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


    })
  }



  modifycordinate() {
    let data: any = []
    this.selectedCorner?.forEach((ele: any) => {
      data.push(`${ele.lat()}  ${ele.lng()}`);
    })

    data.push(`${this.selectedCorner[0].lat()}  ${this.selectedCorner[0].lng()}`)
    return this.selectedCorners = data.join();

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
      Fencing_Data: this.selectedCorner ? this.selectedCorner : '',
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
        this.clearMap()
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

  cancel() {
    this.clearMap()
    this.listVehicleStopDetailsformap = null
    this.selectedCorner = "";
    this.status = 1;
    this.routeFanceName = ''
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
    this.clearMap();
    let newRouteValue = this.routeList?.filter((ele: any) => ele?.value == data?.routeId );        
    newRouteValue.forEach((data: any) => {  
      this.selectedRouteValue = data
    });
    this.routetId = data?.routeId;
    this.selectedCorner = data?.fencing_Data
    this.routeFanceName = data?.routeName;
    let corners = this.selectedCorner
    // this.getRouteOnMap()
    this.mapcorner = false;
    this.viewportScroller.scrollToPosition([0, 0]);
    if (corners) {
      let coordinates = corners.split(',');
      const result = coordinates.map((coordinate) => {
        const [lat, lng] = coordinate.trim().split(/\s+/).map(Number);
        return { lat, lng };
      });

      // Add new polygon to the map
      this.polygon = L.polygon(result, {
        color: '#ff0000',
        weight: 2,
        fillOpacity: 0.35,
      }).addTo(this.map);


      // Add markers for each corner
      result.forEach((coordinate, index) => {
        const marker = L.marker([coordinate.lat, coordinate.lng], {
          icon: L.icon({
            iconUrl: '/assets/mapicon.png',
            iconSize: [30, 30],
          }),
        }).addTo(this.map);

        marker.bindPopup(`
                <div>
                    <p>Latitude: ${coordinate.lat}</p>
                    <p>Longitude: ${coordinate.lng}</p>
                    <button type="button" class="btn btn-danger" onclick="deleteNode(${index})">Delete</button>
                </div>
            `);

        this.cornerMarkers.push(marker);
      });

      const bounds = L.latLngBounds(result.map((c) => [c.lat, c.lng]));
      this.map.fitBounds(bounds);

      // this.addGeoFance.controls['selectedCorner'].setValue(corners);
    }
  }

  clearMap() {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
  
    if (this.polygon) {
      this.map.removeLayer(this.polygon);
    }
    if (this.cornerMarkers && this.cornerMarkers.length > 0) {
      this.cornerMarkers.forEach((marker) => {
        marker.remove()
      });
  }

    this.cornerMarkers = [];
  }



}
