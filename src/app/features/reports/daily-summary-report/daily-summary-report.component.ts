import { Component } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-daily-summary-report',
  templateUrl: './daily-summary-report.component.html',
  styleUrls: ['./daily-summary-report.component.scss']
})
export class DailySummaryReportComponent {
  isloading: boolean = false;
  dailySummaryList: any;
  SelectedDepartment: any;
  selectedValue: any;
  company: any;
  selectDate:any = new Date()
  dailyRouteViolation: any;
  dailySummaryCO2: any;
  dailySummaryComplaint: any;
  dailySummaryDevices: any;
  dailySummaryDriverAtt: any;
  dailySummaryQA: any;
  dailySummaryRoaster: any;
  dailySummaryTrip: any;
  constructor(private ReportsService: ReportsService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getCompany()
    this.showReport()
  }

  getCompany() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.company = res?.body?.data;
    })
  }

  showReport() {
    this.isloading = true;
    let payload = {
      "Dept_ID": this.SelectedDepartment ? parseInt(this.SelectedDepartment  || '') : parseInt(localStorage.getItem('dept_id')),
      "UserID": parseInt(localStorage.getItem('user_Id'))
    }
    this.ReportsService.dailySummaryReport(payload).subscribe((res: any) => {
      this.dailySummaryList = res?.body?.data;
      this.dailyRouteViolation = this.dailySummaryList?.dailyRouteVoilationData
      this.dailySummaryCO2 = this.dailySummaryList?.dailySummaryCO2Emissions
      this.dailySummaryComplaint = this.dailySummaryList?.dailySummaryComplaint
      this.dailySummaryDevices = this.dailySummaryList?.dailySummaryDevices
      this.dailySummaryDriverAtt = this.dailySummaryList?.dailySummaryDriverAtt
      this.dailySummaryQA = this.dailySummaryList?.dailySummaryQA
      this.dailySummaryRoaster = this.dailySummaryList?.dailySummaryRoster
      this.dailySummaryTrip = this.dailySummaryList?.dailySummaryTrip
      this.isloading = false;
    })
  }

  confirm(event: any) {
    if (event.selectType == 'company') {
      this.SelectedDepartment = event.id
    }
  }

  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.selectDate = new Date()
  }
}
