import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../services/registration.service';
import * as L from 'leaflet'; // Correct way to import leaflet
import 'leaflet-draw/dist/leaflet.draw.css'; // Import the Leaflet Draw CSS
import 'leaflet-draw'; // Import Leaflet Draw plugin
import { isPlatformBrowser, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-add-geo-fance-zig-zag-v2',
  templateUrl: './add-geo-fance-zig-zag-v2.component.html',
  styleUrls: ['./add-geo-fance-zig-zag-v2.component.scss'],
})
export class AddGeoFanceZigZagV2Component {
  addGeoFance: FormGroup;
  selectedValue: any;
  department: any;
  departmentId: any = 0;
  geolistdata: any;
  searchKeyword: string = '';
  geofencelist: any;
  statelistdiv: boolean = false;
  alertData: any = {
    message: 'success',
  };
  alertType: any = 'success';
  alertTrigger: any = false;
  button: string = 'Add Record';
  map: L.Map | any;
  polyline: L.Polyline | null = null;
  marker: L.Marker | any = null;
  polygon: L.Polygon | null = null; // Variable to hold the polygon
  cornerMarkers: L.Marker[] = [];
  stopId: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  selectedID: number = 0;


  constructor(
    private fb: FormBuilder,
    private shardService: SharedService,
    private registrationService: RegistrationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private viewportScroller: ViewportScroller

  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
    this.setInitialValue();
    this.setInitialTable()
    this.departmentData();
    this.geolist();
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Geo-Fence Name' },
      { key: '', value: 'Latitude-Longitude' },
      { key: '', value: 'Status' },
      { key: '', value: 'Custom Location' },
    ]
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
          polyline: false,
          polygon: false,
          rectangle: {
            shapeOptions: {
              color: '#ff0000',
            },
          },
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
  
        this.addGeoFance.controls['selectedCorner'].setValue(formattedCoordinates);
        layer
          .bindPopup(
            `<p>Type: ${shapeDetails.type}</p>
             <p>Coordinates: ${JSON.stringify(shapeDetails.coordinates)}</p>
             ${shapeDetails.radius ? `<p>Radius: ${shapeDetails.radius}</p>` : ''}`
          )
          .openPopup();
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
  

  setInitialValue() {
    this.addGeoFance = this.fb.group({
      GeoFanceName: ['', [Validators.required, Validators.pattern('')]],
      selectedCorner: ['', [Validators.required, Validators.pattern('')]],
      status: ['1', [Validators.required, Validators.pattern('')]],
    });
  }


  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }

  confirm(event: any) {
    this.departmentId = event.id;
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    this.geolist();
  }

  geolist() {
    let payload = {
      UserID: parseInt(localStorage.getItem('user_Id') || ''),
      StopName: '',
      PageNo: 1,
      PageSize: 1000,
      DEPT_ID: parseInt(this.departmentId),
      Stop_ID: 0,
    };
    
    this.registrationService.listofgeofence(payload).subscribe((res: any) => {
      this.geolistdata = res?.body?.data;
    });
  }

  geoFenceData() {
    let newDta: any;
    let payload = {
      UserID: parseInt(localStorage.getItem('user_Id') || ''),
      StopName: this.searchKeyword,
      PageNo: 1,
      PageSize: 5000,
      DEPT_ID: parseInt(localStorage.getItem('dept_id') || ''),
      Stop_ID: 0,
    };

    this.registrationService.geofencelist(payload).subscribe((res: any) => {
      this.geofencelist = res?.body?.data;
    });
  }

  filterFunction() {
    if (this.searchKeyword !== '') {
      this.statelistdiv = true;
      this.geoFenceData();
    }
  }

  onSelectData(data: any) {    
    this.clearMap(); 

    this.addGeoFance.reset();
    this.addGeoFance.controls['status'].setValue('1');
    this.stopId = data.stopid.toString();
    this.addGeoFance.controls['GeoFanceName'].setValue(data.stopName);

    this.searchKeyword = data?.stop_Type_Name + '-' + data?.stopName;
    const corners = data?.corners;

    if (data?.lat && data?.lon) {
      const latLng = [data.lat, data.lon] as L.LatLngExpression;

      this.marker = L.marker(latLng, {
        icon: L.icon({
          iconUrl: '/assets/mapicon.png',
          iconSize: [30, 30],
        }),
      })
        .addTo(this.map)
        .bindPopup(
          `
            <div>
                <p>${data?.stopName}</p>
                <p>Latitude: ${data.lat}</p>
                <p>Longitude: ${data.lon}</p>
            </div>
        `
        )
        .openPopup();
    }

    // Plot corners if available
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

      this.polygon.bindPopup('Polygon Area').openPopup();

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

      this.addGeoFance.controls['selectedCorner'].setValue(corners);
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

  @HostListener('document:click')
  clickedOut() {
    this.statelistdiv = false;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
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
      "Corners": formValue.selectedCorner,
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
        this.stopId = 0
        this.selectedValue = {
          value: '',
          text: ''
        }
        this.addGeoFance.reset();
        this.addGeoFance.controls['status'].setValue('1');
        this.searchKeyword = '';
        this.clearMap()
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


  selectedGeofance(geofance: any) {    
    this.clearMap(); 
    this.searchKeyword = '';
    this.button = 'Update Record';
    this.addGeoFance.reset();
    this.addGeoFance.controls['status'].setValue('1');
    this.selectedID = geofance?.stop_ID
    this.viewportScroller.scrollToPosition([0, 0]);
    this.stopId = geofance?.stop_ID
    this.searchKeyword =  geofance?.stopName;
    this.departmentId = geofance?.depT_ID
    this.addGeoFance = this.fb.group({
      GeoFanceName: [geofance?.stopName, [Validators.required, Validators.pattern('')]],
      selectedCorner: [geofance?.corners, [Validators.required, Validators.pattern('')]],
      status: [geofance?.status_ID.toString(), [Validators.required, Validators.pattern('')]],
    })

    let newVehicleValue = this.department?.filter((ele: any) => ele?.value == geofance?.depT_ID);
      newVehicleValue.forEach((data: any) => {
        this.selectedValue = data
      });

      const corners = geofance?.corners;

      if (geofance?.lat && geofance?.lon) {
        const latLng = [geofance.lat, geofance.lon] as L.LatLngExpression;
  
        this.marker = L.marker(latLng, {
          icon: L.icon({
            iconUrl: '/assets/mapicon.png',
            iconSize: [30, 30],
          }),
        })
          .addTo(this.map)
          .bindPopup(
            `
              <div>
                  <p>${geofance?.stopName}</p>
                  <p>Latitude: ${geofance.lat}</p>
                  <p>Longitude: ${geofance.lon}</p>
              </div>
          `
          )
          .openPopup();
      }
  
      // Plot corners if available
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
  
        this.polygon.bindPopup('Polygon Area').openPopup();
  
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
  
        this.addGeoFance.controls['selectedCorner'].setValue(corners);
      }
  }

  cancel() {
    this.clearMap();
    this.button = 'Add Record';
    this.selectedID = 0;
    this.stopId = 0;
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.addGeoFance.reset();
    this.addGeoFance.controls['status'].setValue('1');
    this.searchKeyword = '';
    this.geolist();
  }
}
