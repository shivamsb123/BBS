import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ImgviewComponent } from '../../shared/components/imgview/imgview.component';
import { imgPath } from '../../shared/constant/API_CONSTANT';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';
@Component({
  selector: 'app-quality-status-all-data',
  templateUrl: './quality-status-all-data.component.html',
  styleUrls: ['./quality-status-all-data.component.scss']
})
export class QualityStatusAllDataComponent implements OnInit{
  @ViewChild('TABLE') tableList!: ElementRef;
  @ViewChild("staticTabs", { static: true }) staticTabs?: TabsetComponent;
  outsheldingdata: any;
  flag: string;

  tabId: string = '2';
  tableData2: any;
  tableData3: any;
  tableData4: any;
  quality: any;
  isloading: boolean = false;
  bsModalRef! : BsModalRef
  excelData: any;
  constructor(private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private excelService: ExcelFormatService
    ) { }

  ngOnInit(): void {
    this.flag = this.route.snapshot.paramMap.get("id");
    if (this.flag == '0') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[0].active = true; 
    } else if (this.flag == '1') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[1].active = true; 
    } else if (this.flag == '2') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[2].active = true; 
    } else if (this.flag == '3') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[3].active = true; 
    }
    this.setInitialTable()
    this.qualityData()
    console.log(this.flag);

  }
  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Action' },
      { key: '', value: 'Entry By' },
      { key: '', value: 'Entry On' },
      { key: '', value: 'Vehicle Number' },
      { key: '', value: 'Remark(s)' },
      { key: '', value: 'Status' },
      { key: '', value: 'Document' },
      { key: '', value: 'Location' },
    ],

      this.tableData2 = [
        { key: '', value: 'Action' },
        { key: '', value: 'Entry By' },
        { key: '', value: 'Entry On' },
        { key: '', value: 'Vehicle Number' },
        { key: '', value: 'Remark(s)' },
        { key: '', value: 'Status' },
        { key: '', value: 'Document' },
        { key: '', value: 'Location' },
      ]

    this.tableData3 = [
      { key: '', value: 'Action' },
      { key: '', value: 'Entry By' },
      { key: '', value: 'Entry On' },
      { key: '', value: 'Vehicle Number' },
      { key: '', value: 'Remark(s)' },
      { key: '', value: 'Status' },
      { key: '', value: 'Document' },
      { key: '', value: 'Location' },
    ]

    this.tableData4 = [
      { key: '', value: 'Action' },
      { key: '', value: 'Entry By' },
      { key: '', value: 'Entry On' },
      { key: '', value: 'Vehicle Number' },
      { key: '', value: 'Remark(s)' },
      { key: '', value: 'Status' },
      { key: '', value: 'Document' },
      { key: '', value: 'Location' },
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
  qualityData() {
    let newDta :any;
    this.isloading = true
    let payload = {
      "flag":2,
      "emp_id":parseInt(localStorage.getItem('user_Id') || '208'),
      "view":parseInt(this.tabId),
      "MenuVersion":"v1" 
    }
    this.dashboardService.quality(payload).subscribe((res: any) => {
      this.quality = res?.body?.data;
      this.isloading =false;
    });
  }

  onTablValue(id: any) {
    this.page = 1
    this.tabId = id;
     this.qualityData()
  }

  viewinfractionreport(path:any, id:any){
    let url = path.replace('id',id)
    this.router.navigateByUrl(url)
  }

  OnImageShow(img1:any, img2:any, img3:any) {    
    let imgpath = imgPath;
    let img1data :any
    let img2data :any
    let img3data :any

    if(img1) {
      img1data = imgpath + img1
    }
    if(img2) {
      img2data = imgpath + img2
    }

    if(img3) {
      img3data = imgpath + img3
    }

    console.log("check img", img1data, img2data, img3data);
    
    const initialState: ModalOptions = {
      initialState: {
        img1: img1data,
        img2: img2data,
        img3: img3data,
        modalRef: this.bsModalRef
      },
    };
    this.bsModalRef = this.modalService.show(
      ImgviewComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered" })
    );
  }

  ExportTOExcel() {
    let data: any;
    let reportType :any
    this.excelData = this.quality.map((item: any) => {
      {
        if (this.tabId == '1') {
          data = {
            'Entry By': item?.userName,
            'Entry On': item?.entry_On,
            'Vehicle Number': item?.asseT_NO,
            'Remark(s)': item?.remarK_1,
            'Status': item?.status,
            'Location': item?.geoLocation,
          };
          reportType = 'QC Pass Status'
        } 

        return data
      }
    })

    this.excelService.excelService(this.excelData, reportType)
  }
}
