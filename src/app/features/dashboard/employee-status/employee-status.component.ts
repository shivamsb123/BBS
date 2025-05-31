import { Component, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee-status',
  templateUrl: './employee-status.component.html',
  styleUrls: ['./employee-status.component.scss']
})
export class EmployeeStatusComponent {
  @ViewChild("staticTabs", { static: true }) staticTabs?: TabsetComponent;
  @ViewChild('TABLE') tableList!: ElementRef;

  outsheldingdata: any;
  flag: string;

  tabId: string = '2';
  tableData2: any;
  tableData3: any;
  tableData4: any;
  constructor(private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.flag = this.route.snapshot.paramMap.get("id");
    if (this.flag == '1') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[0].active = true; 
    } else if (this.flag == '2') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[1].active = true; 
    } else if (this.flag == '3') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[2].active = true; 
    } 
    this.setInitialTable()
    // this.outshelding()
    console.log(this.flag);

  }
  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Role Name' },
      { key: '', value: 'First Name' },
      { key: '', value: 'Last Name' },
      { key: '', value: 'Contect No' },
      { key: '', value: 'Email' },
      { key: '', value: 'Employee Code' },
    ],

      this.tableData2 = [
        { key: '', value: 'Role Name' },
        { key: '', value: 'First Name' },
        { key: '', value: 'Last Name' },
        { key: '', value: 'Contect No' },
        { key: '', value: 'Email' },
        { key: '', value: 'Employee Code' },
      ]

    this.tableData3 = [
      { key: '', value: 'Role Name' },
      { key: '', value: 'First Name' },
      { key: '', value: 'Last Name' },
      { key: '', value: 'Contect No' },
      { key: '', value: 'Email' },
      { key: '', value: 'Employee Code' },
    ]

  }
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  // outshelding() {
  //   this.isloading = true;
  //   let newDta: any;
  //   let payload = {
  //     "flag": parseInt(this.tabId) || '',
  //     "emp_id": parseInt(localStorage.getItem('user_Id') || ''),
  //     "view": 1,
  //     "MenuVersion": "v1"

  //   }
  //   this.dashboardService.dashboardAllStatus(payload).subscribe((res: any) => {
  //     this.outsheldingdata = res?.body?.data;
  //     this.isloading = false;
  //   });
  // }

  onTablValue(id: any) {
    this.page = 1
    this.tabId = id;
    // this.outshelding()
  }

  
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableList.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }
}

