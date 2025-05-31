import { Component } from '@angular/core';

@Component({
  selector: 'app-user-vehicle-access',
  templateUrl: './user-vehicle-access.component.html',
  styleUrls: ['./user-vehicle-access.component.scss']
})
export class UserVehicleAccessComponent {
  selectedIndex: any;
  isloading: boolean = false;
  selectedvehicleIndex: any;
  searchKeyword:any;

  ngOnInit() {

  }

  
  changeSelection(event:any, index:any) {
    this.selectedIndex = event.target.checked ? index : undefined;
  }

  changeVehicleSelection(event:any, index:any) {
    this.selectedvehicleIndex = event.target.checked ? index : undefined;
  }
}
