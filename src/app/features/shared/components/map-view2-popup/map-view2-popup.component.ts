
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Cluster, Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';

import { Icon, Style, Fill, Text, Stroke } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';
import { Overlay } from 'ol';
import { fromEvent } from 'rxjs';
import { boundingExtent } from 'ol/extent';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/features/dashboard/services/dashboard.service';
import { get as getProjection } from 'ol/proj';
@Component({
  selector: 'app-map-view2-popup',
  templateUrl: './map-view2-popup.component.html',
  styleUrls: ['./map-view2-popup.component.scss']
})
export class MapView2PopupComponent {
  routeid : any;
 fs_value : any;
  constructor(private dashboardService : DashboardService){}
  filteredData: any;
  markers: Feature | any;
  @ViewChild('myDiv', { static: false })
  myDiv: ElementRef<HTMLDivElement> | any;
  mapList:any;
  id: number = 0;
  map: Map | any ;
  busData: any;
  isOpenlocationData: boolean= false;
/**
 * Elements that make up the popup.
 */
 container = document.getElementById('popup') || '';
 closer = document.getElementById('popup-closer');
 bsModalRef?: BsModalRef;
/**
 * Create an overlay to anchor the popup to the map.
 */
overlays: Overlay | null = null; // Update the type declaration
overlay= new Overlay({

  autoPan: {
    animation: {
      duration: 250,
    },
  },
});
  /** map work  */
  ngOnInit(): void {
     this.initializeMap() 
   
  }
  initializeMap() {
    const indiaExtent = getProjection('EPSG:3857')?.getExtent(); 
    this.map = new Map({
      target: 'map',
   
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([85.73,20.34]),// Center of India
        zoom: 11
      })
    });
    let payload = {
      id: this.id,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      zone_id: 46,
      vehicle_type: 2,
      vehicle_no: '',
      page_no: 1,
      page_size: 150,
      location: '',
      trip_start_date: '',
      district: '',
      fs_value: this.fs_value,
      customer: '',
      depo_name: '',
   
     
    };
    const popup = new Overlay({
      element: document.getElementById('popup') as HTMLElement,
      autoPan: true,
      // autoPanAnimation: {
      //   duration: 250
      // }
    });
    this.map.addOverlay(popup);
    this.dashboardService.mapview2(payload).subscribe((res: any)=> {
       this.busData =res.body?.data?.list_map_view
       this.markers  = this.busData.map((bus: any, index: number) => {
        const coordinates = fromLonLat([bus.longitude, bus.latitude, ]);
   
        const marker = new Feature({
          geometry: new Point(fromLonLat([bus.lon, bus.lat])),
          index: index
        })
        console.log('check marker =>', marker);;
        const iconStyle = new Style({
          image: new Icon({
            src: bus.type == 'BUS' ? 'http://103.190.95.186/dms/images/ASSET_TYPE/2/19_0.png' : 'http://103.190.95.186/dms/images/ASSET_TYPE/9/19_0.png',
            scale: 0.9, // Adjust the scale as needed for individual icons
          
          }),
          stroke: new Stroke({
            color: 'red',
            width: 2
          })
         
        });
        marker.setStyle(iconStyle);
      
        return marker;    
      }
      );
      const clusterStyle = new Style({
        image: new Icon({
          src: '/assets/cluster1.png',
          scale: 0.1 // Adjust the scale as needed for cluster icon
        }),
        text: new Text({
          text: '',
          fill: new Fill({
            color: 'black',
            
        
          }),
      
          font: 'bold 15px Arial',
     
          offsetY: -10 
        }),
        zIndex: 1
      });
      const markerSource = new VectorSource({
        features: this.markers
      });

      const clusterSource = new Cluster({
        distance: 20,
        source: markerSource
      });

      const clusterLayer = new VectorLayer({
        source: clusterSource,
        style: function (feature) {
          const size = feature.get('features').length;

          if (size > 1) {
            clusterStyle.getText().setText(size.toString());
            return clusterStyle;
          } else {
            return feature.get('features')[0].getStyle();
          }
        }
      });

      // Add custom CSS class to the cluster layer
      clusterLayer.set('class', 'custom-cluster');
     
     
      this.map.addLayer(clusterLayer);
     
      this.map.on('click', (e: { pixel: any; }) => {
        const clusterStyle = new Style({
          image: new Icon({
            src: '/assets/cluster1.png',
            scale: 0.1 // Adjust the scale as needed for cluster icon
          }),
          text: new Text({
            text: '',
            fill: new Fill({
              color: 'black',
            }),        
            font: 'bold 30px Arial',       
            offsetY: -10 
          }),
          zIndex: 1
        });

        const clusterLayer = new VectorLayer({
          source: clusterSource,
          style: function (feature) {
            const size = feature.get('features').length;
  
            if (size > 1) {
              clusterStyle.getText().setText(size.toString());
              return clusterStyle;
            } else {
              return feature.get('features')[0].getStyle();
            }
          }
        });
        clusterLayer.getFeatures(e.pixel).then((clickedFeatures: string | any[]) => {
          if (clickedFeatures.length) {
            // Get clustered Coordinates
            const features = clickedFeatures[0].get('features');
            console.log(features);
            
            if (features.length > 5) {
              const extent = boundingExtent(
                features.map((r: { getGeometry: () => { (): any; new(): any; getCoordinates: { (): any; new(): any; }; }; }) => r.getGeometry().getCoordinates())
              );
              this.map.getView().fit(extent, {duration: 1000, padding: [50, 50, 50, 50]});
            }
          }
        });
      });
      this.map.on('singleclick', (evt: { coordinate: any; }) => {
        const clickedFeatures: any[] = [];
      
        // Get the pixel coordinate from the clicked coordinate
        const pixel = this.map.getPixelFromCoordinate(evt.coordinate);
      
        // Check if the clicked pixel intersects with any clustered features
        clusterLayer.getFeatures(pixel).then((features: any) => {
          if (features.length) {
            clickedFeatures.push(...features);
          }
      
          if (clickedFeatures.length > 0) {
            // Get the first clicked feature
            const clickedFeature = clickedFeatures[0];
      
            if (clickedFeature.get('features').length > 1) {
              // Multiple features in the cluster
              const extent = boundingExtent(
                clickedFeature.get('features').map((feature: any) => feature.getGeometry().getCoordinates())
              );
              this.map.getView().fit(extent, { duration: 500, padding: [100, 100, 100, 100] });
            } else {
              // Single feature in the cluster
              const feature = clickedFeature.get('features')[0];
              console.log('get feature =======>',feature);
              
              const index = feature.get('index');
      console.log(index);
      
              // Retrieve the corresponding bus data using the index
            this.filteredData = this.busData[index];
            console.log('checkig vehcile data ', this.filteredData);
            
              this.isOpenlocationData = true;
          
              const busLocationIcon = this.map.icon({
                iconUrl: 'assets/greenbus.png',
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
              });
               
              popup.setElement(this.myDiv.nativeElement);
              popup.setPosition(evt.coordinate);
              // this.myDiv.nativeElement.innerHTML = content;
            }
          }
        });
      });
    });
  }
  closeNav() {
    this.isOpenlocationData = false;
    this.filteredData = {};
  };
}
