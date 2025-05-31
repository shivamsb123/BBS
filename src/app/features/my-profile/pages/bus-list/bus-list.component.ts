import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { RegistrationService } from 'src/app/features/registration/services/registration.service';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss']
})
export class BusListComponent {
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  isloading: boolean = false
  tableData: any;
  busList: any;
  myDate:any = new Date()
  bsValue = new Date();
  constructor( private registrationService: RegistrationService,) { }

  ngOnInit() {
    this.setInitialTable()
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Date' },
      { key: '', value: 'Vehicle No.' },
      { key: '', value: 'Driver Name' },
    ]
  }

  getVehicleList() {
    this.isloading = true;
    let payload = {
        "R_Att_Date":formatDate(this.myDate, 'yyyy-MM-dd', 'en-US')
    }
    this.registrationService.vehicleList(payload).subscribe((res: any) => {
      this.busList = res?.body?.data;
      this.isloading = false;
    })
  }

  /**
* tabel size chage method
* @param event 
*/
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
}

/**
 * table data change
 * @param event 
 */
onTableDataChange(event: any) {
  this.page = event;
};
}
