import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';
import Map from 'ol/Map';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-vehicle-wise',
  templateUrl: './vehicle-wise.component.html',
  styleUrls: ['./vehicle-wise.component.scss']
})
export class VehicleWiseComponent implements OnInit {
  historylist: any;
  map: Map | any;
  lastPosition: any;
  debounceTimer: any;
  polyline: google.maps.Polyline | any;
  markers: any;
  vehicleData: any;
  selectedVehicle: any;
  mapOptions: { center: { lat: number; lng: number; }; zoom: number; } | any;
  infoWindow: google.maps.InfoWindow | undefined;

  constructor(private trackingService: TrackingService, private shardService: SharedService) { }

  ngOnInit(): void {
    this.mapOptions = {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 12
    };

    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, this.mapOptions);
    this.map = map;
    this.getVehicleZoneData();
  }

  public livemap: any = [];

  getlist() {
    let payload = {
      "user_id": parseInt(localStorage.getItem('user_Id') || ''),
      "id": parseInt(this.selectedVehicle || ''),
      "RecordType": 0
    };

    this.trackingService.livetrackinghistory(payload).subscribe((res: any) => {
      this.historylist = res?.body?.data;
      const newLocation = {
        lat: this.historylist.lat,
        lon: this.historylist.lon,
        speed: this.historylist.speed,
        driver: this.historylist.driver,
        time: this.historylist.lasT_GPS_UPDATE,
        place: this.historylist.place
      };
      this.livemap.push(newLocation);
      console.log(this.livemap);

      if (Array.isArray(this.livemap)) {
        this.livemap.forEach((bus: any) => {
          const busLatLng = new google.maps.LatLng(bus.lat, bus.lon, bus.speed);
          const rotationAngle = 45; // Replace with your desired rotation angle in degrees

          // Create a marker with a custom icon
          const marker = new google.maps.Marker({
            position: busLatLng,
            map: this.map,
            icon: {
              url: bus.speed !== 0 ? '/assets/greenbus.png' : '/assets/yellowbus.png' ,
              scaledSize: new google.maps.Size(20, 20),
              rotation: rotationAngle
            },
            title: this.livemap.name
          });
          marker.addListener('click', () => {
            this.openInfoWindow(bus, marker);
          });
          this.markers?.push(marker);
        });

        this.updatePolyline();

        if (this.livemap.length > 0) {
          const latestBus = this.livemap[this.livemap.length - 1];
          const latestLatLng = new google.maps.LatLng(latestBus.lat, latestBus.lon);
          this.map.setCenter(latestLatLng);
          this.map.setZoom(19);
        }
      } else if (typeof this.livemap === 'object') {
        const busLatLng = new google.maps.LatLng(this.livemap.lat, this.livemap.lon);
        const marker = new google.maps.Marker({
          position: busLatLng,
          map: this.map,
          icon: {
            url: this.livemap.speed !== 0 ? '/assets/greenbus.png' : '/assets/yellowbus.png',
            scaledSize: new google.maps.Size(20, 20)
          },
          title: this.livemap.name
        });
        marker.addListener('click', () => {
          this.openInfoWindow(this.livemap, marker);
        });
        this.markers.push(marker);

        const latestLatLng = new google.maps.LatLng(this.livemap.lat, this.livemap.lon);
        this.map.setCenter(latestLatLng);
        this.map.setZoom(19);
      } else {
        console.error('Invalid historylist data:', this.livemap);
      }

      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.getlist();
      }, 10000);
    });
  }

  updatePolyline() {
    const path = this.livemap.map((bus: any) => ({
      lat: bus.lat,
      lng: bus.lon
    }));

    this.polyline = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: 'black', // Replace with your desired route color
      strokeOpacity: 3.0,
      strokeWeight: 2,
      icons: [
        {
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 2, // Adjust arrow size as needed
            fillColor: 'black', // Replace with your desired arrow color
            fillOpacity: 1.0
          },
          offset: '100%', // Place arrow at the end of the polyline
          repeat: '100px' // Repeat the arrow every 100 pixels
        }
      ]
    });

    this.polyline.setMap(this.map);
  }

  openInfoWindow(bus: any, marker: any): void {
    if (this.infoWindow) {
      this.infoWindow.close();
    }

    this.infoWindow = new google.maps.InfoWindow({
      content: `<div>
                  <strong>Driver:</strong> <span class="badge badge-primary">${bus.driver}</span><br/>
                  <strong>Time:</strong> ${bus.time} <i class="fa fa-clock-o" aria-hidden="true"></i><br/>
                  <strong>Location:</strong> ${bus.place}<br/>
                  <strong>Lat:</strong> ${bus.lat} <i class="fa fa-map-marker" aria-hidden="true"></i><br/>
                  <strong>Long:</strong> ${bus.lon} <i class="fa fa-map-marker" aria-hidden="true"></i><br/>
                  <strong>Speed:</strong> ${bus.speed} <i class="fa fa-tachometer" aria-hidden="true"></i>
                </div>`
    });

    this.infoWindow.open(this.map, marker);
  }

  /**
   * Vehicle list here
   */
  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    });
  }

  confirm(event: any) {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, this.mapOptions);
    this.map = map;
    this.selectedVehicle = event.id;
    this.livemap = [];
    this.getlist();
  }
}
