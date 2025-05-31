import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { WorkshopService } from 'src/app/features/workshop/services/workshop.service';
import { AddMaterialComponent } from '../add-material/add-material.component';

@Component({
  selector: 'app-material-issue',
  templateUrl: './material-issue.component.html',
  styleUrls: ['./material-issue.component.scss']
})
export class MaterialIssueComponent {
  @ViewChild(AddMaterialComponent) childComponent: AddMaterialComponent;
  searchKeyword: any;
  isloading: boolean = false;
  jobCard: any
  selectedValue: any
  page = 1;
  count = 0;
  tableData: any;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  materialList: any;
  tableData1: any;
  jobCardChildList: any;
  jobCardId: any;
  bsmodal!: BsModalRef;
  productItem: any = [];
  filteredArray: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;

  constructor(
    private workshopService: WorkshopService,
    private modalService: BsModalService,
    ) { }

  ngOnInit() {
    this.initialTable()
    this.getJobList()
   
  }

  initialTable() {
    this.tableData1 = [
      { key: 'keyValue', val: 'Job Id' },
      { key: 'keyValue', val: 'Description Name' },
      { key: 'keyValue', val: 'Mechanic Name' },
      { key: 'keyValue', val: 'Add' },
      { key: 'keyValue', val: 'Details' },
    ]
  }

  confirm(event: any) { 
    this.jobCardId = event.id
    this.getJobChildList()
  }

  getJobChildList() {
    this.isloading = true
    this.workshopService.getchildList(this.jobCardId).subscribe((res: any) => {
      this.jobCardChildList = res?.body
      this.isloading = false
    });
  }

  getJobList() {
    this.isloading = true
    let newData = {
      value:'',
      text:''
    }
    let payload = {
      "date": null,
      "createdby": null,
      "vehicleId": null
    }
    this.workshopService.jobCardList(payload).subscribe((res: any) => {
      let data = res?.body
      this.jobCard = data.map((val:any)=>
      newData = {
        value:val?.jobCardID,
        text: val?.serialNumber + ' / ' + val?.busNumber
      }
      )
      this.isloading = false
    });
  }

  viewDetails(subId:any){
    const initialState: ModalOptions = {
      initialState: {
        tittle:'Issue Material List',
        subId:subId,
        jobId:this.jobCardId
      },
    };
    this.bsmodal = this.modalService.show(
      AddMaterialComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );

  }


  addMaterial(SubJobId:any){
    const initialState: ModalOptions = {
      initialState: {
        tittle:'Issue Material',
        jobCardId:this.jobCardId,
        subJobId:SubJobId
      },
    };
    this.bsmodal = this.modalService.show(
      AddMaterialComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );

    this.bsmodal?.content.productAdded.subscribe((value:any)=>{
      this.productItem.push(value)
      this.filteredArray = this.productItem.map(item => ({
          ID: null,
          jobCardId: parseInt(item?.jobCardId),
          subJobId: parseInt(item?.subJobId),
          productId: parseInt(item?.proId),
          qty: parseInt(item?.qty),
        }));
        return this.filteredArray;
    })
  }

  materialIssue(){
    this.isloading = true
    this.workshopService.issueMaterial(this.filteredArray).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.status == 200) {
        this.alertData = {
          message: 'Material Issued Succesfully'
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();

      } else {
        this.alertData = {
          message: 'Material Not Issued',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
      this.isloading = false
    });
    this.productItem = []
    this.filteredArray = []
  }


  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
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
}
