import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { RegistrationService } from '../services/registration.service';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  @ViewChild("staticTabs", { static: true }) staticTabs?: TabsetComponent;
  outsheldingdata: any;
  flag: string;
  tabId: string = '1';
  tableData2: any;
  tableData3: any;
  tableData4: any;
  tableData5:any
  quality: any;
  isloading: boolean = false
  familyListData: any;
  constructor(private RegistrationService: RegistrationService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.flag = this.route.snapshot.paramMap.get("id");
    this.setInitialTable();
    if(this.tabId == '1') {
      this.getFamilyList()
    }

  }
  setInitialTable() {
    this.tableData = [
      { key: 'reserveName', value: 'Employe Name' },
      { key: 'reserveName', value: "Relation's Name" },
      { key: 'reservedBy', value: 'Relation' },
      { key: 'reserveName', value: 'DOB' },
      { key: 'reserveName', value: 'Occupation' },
      { key: 'reserveName', value: 'Action' },
    ],

      this.tableData2 = [
        { key: 'reserveName', value: 'Employee Name' },
        { key: 'reserveName', value: "Health Card Types" },
        { key: 'reservedBy', value: 'Health Crad No' },
        { key: 'reserveName', value: 'Version Code' },
        { key: 'reserveName', value: 'Valid From Date' },
        { key: 'reserveName', value: "Valid To Date" },
        { key: 'reservedBy', value: 'DOB' },
        { key: 'reserveName', value: 'Blood Group' },
        { key: 'reserveName', value: 'Colour' },
        { key: 'reserveName', value: "Height" },
        { key: 'reservedBy', value: 'Weight' },
        { key: 'reserveName', value: 'Eye Side Vision' },
        { key: 'reserveName', value: 'Health Diseas' },
        { key: 'reserveName', value: 'Any Illness' },
        { key: 'reserveName', value: 'Action' }
      ]

    this.tableData3 = [
      { key: 'reserveName', value: 'Employee Name' },
      { key: 'reserveName', value: 'Organzation Name' },
      { key: 'reservedBy', value: 'Form Date' },
      { key: 'reserveName', value: 'To Date' },
      { key: 'reserveName', value: 'Total Experience' },
      { key: 'reserveName', value: 'Reason For Jon Change' },
      { key: 'reservedBy', value: 'Reference Name' },
      { key: 'reserveName', value: 'Reference Contact Number' },
      { key: 'reserveName', value: 'Action' },
    ]

    this.tableData4 = [
      { key: 'reserveName', value: 'Driver Name' },
      { key: 'reserveName', value: 'Vehicle No' },
      { key: 'reservedBy', value: 'From Date' },
      { key: 'reserveName', value: 'To Date' },
      { key: 'reserveName', value: 'Driving Km' },
      { key: 'reserveName', value: 'No Of Harsh Acceleration' },
      { key: 'reserveName', value: 'No Of Harsh Bracking' },
      { key: 'reserveName', value: 'No Of Harsh Bracking' },
      { key: 'reserveName', value: 'No Of Frequent Bracking' },
      { key: 'reserveName', value: 'No Of High-speed Turning' },
      { key: 'reserveName', value: 'No Of Frequent Stopping' },
      { key: 'reserveName', value: 'No Of Accident' },
      { key: 'reserveName', value: 'Driver Behavior' },
    ]

    this.tableData5 = [
      { key: 'reserveName', value: 'Driver Name' },
      { key: 'reserveName', value: 'ID Proof' },
      { key: 'reservedBy', value: 'ID Proof Number' },
      { key: 'reserveName', value: 'Issue Date' },
      { key: 'reserveName', value: 'Expire Date' },
      { key: 'reserveName', value: 'Authority Name' },
    ]
  }
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

  getFamilyList() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Emp_Id": parseInt(this.flag)
    }
    this.RegistrationService.familyList(payload).subscribe((res:any) => {
      this.familyListData = res?.body?.data;
      this.isloading = false;
    })
  }

  getHealthList() {
    this.isloading = true;
    let payload = {
      "PageNO": 0,
      "PageSize": 0,
      "Emp_Id": parseInt(this.flag)
    }
    this.RegistrationService.healthList(payload).subscribe((res:any) => {
      this.familyListData = res?.body?.data;
      this.isloading = false;
    })
  }

  getProfessionalList() {
    this.isloading = true;
    let payload = {
      "PageNO": 0,
      "PageSize": 0,
      "Emp_Id": parseInt(this.flag)
    }
    this.RegistrationService.professionalList(payload).subscribe((res:any) => {
      this.familyListData = res?.body?.data;
      this.isloading = false;
    })
  }


  onTablValue(id: any) {
    this.tabId = id;
    if(this.tabId == '1') {
      this.getFamilyList()
    } else if(this.tabId == '2') {
      this.getHealthList()
    }  else if(this.tabId == '3') {
      this.getProfessionalList()
    }

  }

  redirectTo(path:any) {
    let url = path.replace('id', this.flag);
    this.router.navigateByUrl(url)
  }
}

