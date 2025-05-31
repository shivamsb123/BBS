import { Component } from '@angular/core';
import { DashboardService } from 'src/app/features/dashboard/services/dashboard.service';
import { ClusterManager } from '@agm/js-marker-clusterer';
@Component({
  selector: 'app-cluster-map',
  templateUrl: './cluster-map.component.html',
  styleUrls: ['./cluster-map.component.scss'],
})
export class ClusterMapComponent {
  fs_value: any;
  busData: any[] = []; // Initialize with an empty array
  mapOptions: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 10,
  };
  id: number = 0;
  constructor(private dashboardService: DashboardService,
    private clusterManager: ClusterManager) {}
  ngOnInit(): void {
    this.initializeMap();
  }
  initializeMap() {
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
    this.dashboardService.mapview2(payload).subscribe((res: any) => {
      this.busData = res.body?.data?.list_map_view;

      this.clusterManager.clearMarkers(); // Clear existing markers

      // this.busData.forEach((bus: any) => {
      //   if (bus.lat && bus.lon) {
      //     this.clusterManager.addMarker({
      //       lat: bus.lat,
      //       lng: bus.lon,
      //     });
      //   }
      // });
    });
  }
}
