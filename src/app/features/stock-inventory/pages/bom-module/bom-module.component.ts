import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { RegistrationService } from 'src/app/features/registration/services/registration.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bom-module',
  templateUrl: './bom-module.component.html',
  styleUrls: ['./bom-module.component.scss']
})
export class BomModuleComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  routeList: any;
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableData: any;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  routeName: any;
  vehicleData: any;

  constructor(
    private shardService: SharedService,
    private registrationService: RegistrationService,
    private Route:Router
  ) { }
  ngOnInit() {
    this.setInitialTableValue();
    this.getRouteListData();
    this.getVehicleZoneData()
  }

  setInitialTableValue() {
    this.tableData = [
      { key: '', val: 'System Name' },
      { key: '', val: 'Seriol No.' },
      { key: '', val: 'Part Details' },
      { key: '', val: 'Qty' },
      { key: '', val: 'Unit' },
      { key: '', val: 'FOB Unit price' },
      { key: '', val: 'RC 5000 KM' },
      { key: '', val: 'RC 10000 KM ' },
      { key: '', val: 'RC 20000 KM ' },
      { key: '', val: 'RC 40000 KM' },
      { key: '', val: 'RC 60000 KM ' },
      { key: '', val: 'RC 80000 KM ' },
      { key: '', val: 'RC 100000 KM ' },
      { key: '', val: 'RC 120000 KM ' },
      { key: '', val: 'RC 140000 KM ' },
      { key: '', val: 'RC 160000 KM ' },
      { key: '', val: 'RC 180000 KM ' },
      { key: '', val: 'RC 200000 KM ' },
      { key: '', val: 'RC 220000 KM ' },
      { key: '', val: 'RC 240000 KM ' },
      { key: '', val: 'RC 260000 KM ' },
    ]
  }

  getRouteListData() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "Page_No": 1,
      "Page_Size": 100,
      "Flag": 1,
      "bStatus": 1
    }

    this.registrationService.routeListData(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.routeList = data.map((val: any) =>
        newData = {
          value: val?.routE_NO,
          text: val?.routE_NAME +' /' + val?.routE_NO
        }
      )
    })
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  confirm(event: any) {
    if (event.selectType == 'Route') {
      this.routeName = event.id
  }
}

  /**
 * tabel size chage method
 * @param event 
 */
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableList.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }

  AddProduct(path: any, id:any) {
    let url = path.replace('id', id)
    this.Route.navigateByUrl(url)
  }
}
