import { Component } from '@angular/core';

@Component({
  selector: 'app-near-by-vehicle',
  templateUrl: './near-by-vehicle.component.html',
  styleUrls: ['./near-by-vehicle.component.scss']
})
export class NearByVehicleComponent {
  lat = 28.5355;
  lng = 77.3910;
  constructor() { }

  ngOnInit(): void {
  }
}
