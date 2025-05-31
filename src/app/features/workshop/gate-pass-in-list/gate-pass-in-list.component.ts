import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-gate-pass-in-list',
  templateUrl: './gate-pass-in-list.component.html',
  styleUrls: ['./gate-pass-in-list.component.scss']
})
export class GatePassInListComponent {

searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  getPassInList:any

  constructor(
    private route: Router,
    private workshopService: WorkshopService,
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getPassIn()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle No.' },
      { key: 'keyValue', val: 'Service Type' },
      { key: 'keyValue', val: 'Keeper NAme' },
      { key: 'keyValue', val: 'In Time' },
      { key: 'keyValue', val: 'Action' },

    ]
  }

  getPassIn() {
    let payload = {

        "ID":null,
        "VehicleID":null,
        "Date":null
    }
    this.workshopService.getPassIndata(payload).subscribe((res: any) => {
      this.getPassInList = res?.body;
      
    });
  }

  createGatePassIn(path: any,id:any) {
    let url = path.replace('id',id)
    this.route.navigateByUrl(url)
  }

  /**
* tabel size chage method
* @param event 
*/
onTableSizeChange(event: any): void {
  this.tableSize = parseInt(event.target.value);
  this.page = 1;
}

onTableDataChange(event: any) {
  this.page = event;
};
}
