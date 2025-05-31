import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DashboardService } from '../../dashboard/services/dashboard.service';

@Component({
  selector: 'vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {
  @Output() onConfirm = new EventEmitter();
  @Output() onSelectStatus = new EventEmitter();
  fsValueData = -1; 
  id: any;
  selectedRouteValue:any;
  mapList: any;
  @Input() trackList: any;
  filterData: any;
  @Input() vehicleData: any;
  dynamicFsvalue: any = 0;
  selectedValue: any;
  searchKeyword:any;
  statusData:any;
  allVehicleData:any


  constructor(
  ){}

  ngOnInit(): void {  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.trackList && this.trackList.length > 0) {
      this.formStatusData();  
    }
    this.allVehicleData = this.vehicleData
    
  }

  formStatusData() {
    this.statusData = [
      {
        label: this.trackList[0]?.total + this.trackList[1]?.total + this.trackList[2]?.total +  this.trackList[3]?.total,
        class: '#696969',
        color: 'rgb(0 0 0)',
        status: 'All',
        fS_VALUE: this.fsValueData
      },
      {
        label: this.trackList[0]?.total,
        class: 'green',
        color: 'rgb(25 173 0)',
        status: 'Running',
        fS_VALUE: this.trackList[0]?.fs_value
      },
      {
        label: this.trackList[1]?.total,
        class: 'blue',
        color: '#4861ED',
        status: "Stop",
        fS_VALUE: this.trackList[1]?.fs_value

      },
      {
        label: this.trackList[3]?.total,
        class: 'orange',
        color: '#FFAF1D',
        status: 'Long Stay',
        fS_VALUE: this.trackList[3]?.fs_value

      },
      {
        label: this.trackList[2]?.total,
        class: 'gray',
        color: '#414141',
        status: 'Offline',
        fS_VALUE: this.trackList[2]?.fs_value

      },

    ];
  }

  showContent = true;

  toggleContent() {
    this.showContent = !this.showContent;
  }

  formatVehicleStatusDuration(vehicle:any) {
    if(vehicle?.fS_VALUE == 1) {
      return `Running ${vehicle?.speed}`
    } else if (vehicle?.fS_VALUE == 2) {
      return `Stopped `
    } else if (vehicle?.fS_VALUE == 3) {
      return `Offline `
    }  else if (vehicle?.fS_VALUE == 4) {
      return `Long Stay `
    } return 'Offline';
  }

  getVehicleColor(vehicle: any): string {
    if(vehicle?.fS_VALUE == 1) {
      return `status-0`
    } else if (vehicle?.fS_VALUE == 2) {
      return `status-1-substatus-2 `
    } else if (vehicle?.fS_VALUE == 3) {
      return `status-0-no-substatus` 
    }  else if (vehicle?.fS_VALUE == 4) {
      return `status-2-substatus-3`
    } return 'status-0-no-substatus';
  }

  onSelectVehicle(vehicle:any) {
    if(!vehicle) return;
    this.onConfirm.emit(vehicle)
  }

  selectStatus(statusValue:any) {
    this.onSelectStatus.emit(statusValue)
  }
}
