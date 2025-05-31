import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  inspectionList: any;

  constructor(
    private route: Router,
    private workshopService: WorkshopService,
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getInspectionData()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Id' },
      { key: 'keyValue', val: 'Name' },
      { key: 'keyValue', val: 'Rate' },
      { key: 'keyValue', val: 'Standerd Time' },
      { key: 'keyValue', val: 'Action' },

    ]
  }

  getInspectionData() {
    let payload = {
      "ID": null
    }
    this.workshopService.getInspection(payload).subscribe((res: any) => {
      this.inspectionList = res?.body;
    });
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

  addInspection(path: any,id:any) {
    let url = path.replace('id',id)
    this.route.navigateByUrl(url)
  }

}
