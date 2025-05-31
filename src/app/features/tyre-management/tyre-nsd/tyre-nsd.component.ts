import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TyreService } from '../services/tyre.service';
import { SharedService } from '../../http-services/shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tyre-nsd',
  templateUrl: './tyre-nsd.component.html',
  styleUrls: ['./tyre-nsd.component.scss']
})
export class TyreNsdComponent {

  tyreNSDModalRef!: BsModalRef;
  type: string = 'TYRE_NSD_page'
  nsdData: any;
  vehicleData: any;
  selectedVehicleValue: any;
  vehicleName: any;
  searchKeyword: any;
  tableData: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];

  constructor(
    private modalService: BsModalService,
    private tyreService: TyreService,
    private sharedService: SharedService, 
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getVehicleZoneData()
    this.initialTable()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'NSD Date ' },
      { key: 'keyValue', val: 'FRT RH O' },
      { key: 'keyValue', val: 'FRT RH M ' },
      { key: 'keyValue', val: 'FRT RH I' },
      { key: 'keyValue', val: 'FRT RH Status ' },
      { key: 'keyValue', val: 'FRT RH Ware   ' },
      { key: 'keyValue', val: 'FRT LH O  ' },
      { key: 'keyValue', val: 'FRT LH M ' },
      { key: 'keyValue', val: 'FRT LH I  ' },
      { key: 'keyValue', val: 'FRT LH Status  ' },
      { key: 'keyValue', val: 'FRT LH Ware   ' },
      { key: 'keyValue', val: 'RR RHS Inner O ' },
      { key: 'keyValue', val: 'RR RHS Inner M ' },
      { key: 'keyValue', val: 'RR RHS Inner I ' },
      { key: 'keyValue', val: 'RR RHS Inner Status ' },
      { key: 'keyValue', val: 'RR RHS Inner Ware ' },
      { key: 'keyValue', val: 'RR RHS Outer O ' },
      { key: 'keyValue', val: 'RR RHS Outer M ' },
      { key: 'keyValue', val: 'RR RHS Outer I ' },
      { key: 'keyValue', val: 'RR RHS Outer  Status ' },
      { key: 'keyValue', val: 'RR RHS Outer Ware ' },
      { key: 'keyValue', val: 'RR LHS Inner O ' },
      { key: 'keyValue', val: 'RR LHS Inner M ' },
      { key: 'keyValue', val: 'RR LHS Inner I ' },
      { key: 'keyValue', val: 'Action ' },
    ]
  }

  onAddTyreNSD(template: TemplateRef<any>) {
    this.tyreNSDModalRef = this.modalService.show(template)   
  }
  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }
  getNsdListData() {
    this.isloading = true;
    let payload = {
      "depot_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "buS_ID": parseInt(this.vehicleName || ''),
      "pageNo": 1,
      "pageSize": 100,
      "nsD_ID": 0
    }
    this.tyreService.nsdList(payload).subscribe((res: any) => {
      this.nsdData = res?.body?.data
      this.isloading = false;
      this.selectedVehicleValue = {
        value: '',
        text: ''
      }
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
  };
  confirm(event: any) {
    if (event.selectType == 'Vehicle') {
      this.vehicleName = event.id
    }
  }
  AddTyreNsd(){
    let url = '/Maintenance/Add_Nsd';
    this.router.navigateByUrl(url);
  }
  redirectTo(path: any, nsdValue: any) {
    let url = path.replace('id', nsdValue?.nsD_ID)
    this.router.navigateByUrl(url, { state: nsdValue });
  }

  formateDate(date:any) {
   return this.sharedService.formatDateValue(date)
  }
}
