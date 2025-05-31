import { Component } from '@angular/core';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-track-vehicle',
  templateUrl: './track-vehicle.component.html',
  styleUrls: ['./track-vehicle.component.scss'],
})
export class TrackVehicleComponent {
  vehicleData: any;

  constructor(private trackingService: TrackingService) {}
  ngOnInit() {
    this.livetrackingData();
  }

  livetrackingData() {
    let payload = {
      id: 13855,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
    };
    this.trackingService.getLive(payload).subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    });
  }
}
