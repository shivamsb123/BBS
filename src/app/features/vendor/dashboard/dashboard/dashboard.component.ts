import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  dashboardData:any;
  constructor(
    private router:Router,
    private vendorService: VendorService
  ) {}

  ngOnInit() {
    this.getDashboardData()
  }

  navigateUrl(id:any) {
    let url ='vendordashboard/RPF_Details/id'.replace(
      "id",
      id
    )
   this.router.navigateByUrl(url);
  }

  navigateUrlGrn(){
    let url = 'vendordashboard/po_list'
    this.router.navigateByUrl(url);
  }

  navigateUrlChallanList(){
    let url = 'vendordashboard/Challan_list'
    this.router.navigateByUrl(url);
  }

  navigateUrlChallan(){
    let url = 'vendordashboard/delivery_challan'
    this.router.navigateByUrl(url);
  }

  navigatetototalQuotaion() {
    let url = 'vendordashboard/total_Quotation'
    this.router.navigateByUrl(url);
  }

  navigateToPo() {
    let pageName = 'QuotationPO'
    let url = '/vendordashboard/po_list'
    this.router.navigateByUrl(url, { state: {name: pageName} })
  }

  navigateToGRN() {
    let pageName = 'GRN'
    let url = '/vendordashboard/GRN_List'
    this.router.navigateByUrl(url)
  }

  getDashboardData() {
    let payload = {
      "sup_id":localStorage.getItem('sup_id'),
      "Dept_ID":parseInt(localStorage.getItem('dept_id')),
      "session_id":1
    }

    this.vendorService.vendorDashboard(payload).subscribe((res:any) => {
      this.dashboardData = res?.body?.data
    })
  }

}
