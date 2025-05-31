import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-complaint-timeline',
  templateUrl: './complaint-timeline.component.html',
  styleUrls: ['./complaint-timeline.component.scss']
})
export class ComplaintTimelineComponent implements OnInit {
  tableData: any;
  complaintIDValue: any;
  complaintTimeline: any;
  complainThread: any;
  dispostionData = [
    {
      value: 'Open',
      id: '0'
    }, {
      id: '1',
      value: 'Close'
    }]
  formData!: FormData;
  addComplaintTimlineForm!: FormGroup
  thread: any;
  timeline: any;
  currentId: number = 0;
  firstDoc: any;
  secDoc: any;
  thirdDoc: any;

  constructor(
    private dashboardService: DashboardService,
    private location: Location,
    private fb: FormBuilder
  ) { };

  ngOnInit(): void {
    let complainId: any = this.location.getState();
    this.complaintIDValue = complainId?.id;

    this.setInitialTable();
    this.setInitalValue();
    this.getComplaintTimeline();
    this.getComplainThread()
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Complaint' },
      { key: '', value: 'Status ' },
      { key: '', value: 'Complaint Category' },
    ]
  }

  setInitalValue() {
    this.addComplaintTimlineForm = this.fb.group({
      document1: ['', [Validators.required, Validators.pattern('')]],
      document2: ['', [Validators.required, Validators.pattern('')]],
      document3: ['', [Validators.required, Validators.pattern('')]],
      dispositionValue: ['0', [Validators.required, Validators.pattern('')]],
      partNo: ['', [Validators.required, Validators.pattern('')]],
      quantity: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  getComplaintTimeline() {
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "ComplaintId": parseInt(this.complaintIDValue || '')

    }
    this.dashboardService.complaintTimeline(payload).subscribe((res: any) => {
      this.complaintTimeline = res?.body?.data;
      this.complaintTimeline.forEach((res: any) => {
        this.timeline = res
      })

    })
  }

  getComplainThread() {
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "ComplaintId": parseInt(this.complaintIDValue || '')

    }
    this.dashboardService.complaintThread(payload).subscribe((res: any) => {
      this.complainThread = res?.body?.data;
      this.complainThread.forEach((res: any) => {
        this.thread = res?.complaint_Body
      })
    })

  }

  changeDocument(event: any, id:any) {
    this.currentId = id;
    const file = event.target.files[0];

    if (id == 1) {
      this.firstDoc = file;
      this.convertFileToBase64(file);
    } else if (id == 2) {
      this.secDoc = file;
       this.convertFileToBase64(file); //turn into base64
    }
    else if (id == 3) {
      this.thirdDoc = file;
       this.convertFileToBase64(file); //turn into base64
    }
  }

  convertFileToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = btoa(reader.result as string);
      
      let id = this.currentId;
      switch (id) {
        case 1:
          this.firstDoc = base64String;
          break;
        case 2:
          this.secDoc = base64String;
          break;
        case 3:
          this.thirdDoc = base64String;
          break;

      }
      
    };

    reader.readAsBinaryString(file);
  }

  submit(formValue: any) {    
    if(formValue?.dispositionValue == 'Select Disposition'){
      this.addComplaintTimlineForm.value.dispositionValue = ''
    }

    let payload = {
      "Complaint_ID": parseInt(this.complaintIDValue || ''),
      "User_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "complaints": "",
      "Complaint_Body": this.timeline?.complaints,
      "Doc_1": this.firstDoc ? this.firstDoc : '',
      "Doc_2": this.secDoc ? this.secDoc : '',
      "Doc_3": this.thirdDoc ? this.thirdDoc : '',
      "Part_No": formValue.partNo,
      "Quantity": formValue.quantity,
      "Disposition": parseInt(formValue?.dispositionValue || '') 

    }
    this.dashboardService.addcomplaintTimeline(payload).subscribe((res: any) => {
      console.log("check res data", res);
      if(res?.body?.status == 'Success') {
        this.getComplainThread()
      }
    })
  }
}
