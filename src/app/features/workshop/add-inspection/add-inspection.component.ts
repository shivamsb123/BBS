import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkshopService } from '../services/workshop.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-inspection',
  templateUrl: './add-inspection.component.html',
  styleUrls: ['./add-inspection.component.scss']
})
export class AddInspectionComponent {

  hstep = 1;
  mstep = 1;
  isMeridian = false;
  fromtime:any = new Date();
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 9, 12];
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  deptList: any;
  isloading: boolean = false;
  InspectionForm: any;
  successMessage: any = 'ADD'
  errorMessage: any = 'Added'
  inspectionId: any;
  inspectionData: unknown;
  serviceList: any;
  selectedValue: any
  serviceType: any;
  inspectionList: any;
  button: any = 'Add';

  constructor(
    private fb: FormBuilder,
    private workshopService: WorkshopService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,

  ) { }
  ngOnInit(): void {
    this.inspectionId = this.route.snapshot.paramMap.get("id");
    if(this.inspectionId){
      setTimeout(() => {
        this.getInspectionData()
      }, 500);
    }
    this.setInitialTable();
    this.setInitialForm()
    this.getSerivice()
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Id' },
      { key: '', value: 'Job Category Name' },
      { key: '', value: 'Job Type' },
    ]
  }

  setInitialForm() {
    this.InspectionForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('')]],
      rate: ['', [Validators.required, Validators.pattern('')]],
      standard_timing: [new Date(), [Validators.required, Validators.pattern('')]],
      service_type: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  addInspection(formValue: any) {
    let payload = {

      "Id": 0,
      "Description": formValue?.name,
      "Rate": parseInt(formValue?.rate),
      "Status": 1,
      "StandardTiming": formatDate(formValue?.standard_timing, 'HH:mm:ss', 'en-US'),
      "CreatedBy": parseInt(localStorage.getItem('user_Id') || ''),
      "sT_ID": this.serviceType,
    }  
    if(this.inspectionId){
      payload.Id = parseInt(this.inspectionId)
    }

    this.workshopService.addInspection(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.status == 200) {
        this.alertData = {
          message: `${this.successMessage} Data Successfully`
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        setTimeout(() => {
          this.router.navigateByUrl('/WorkShop/Inspection')
        }, 2000);
      } else {
        this.alertData = {
          message: `Data Not ${this.errorMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    });
    this.InspectionForm.reset()
  }

  getInspectionData() {
    this.successMessage = 'Update'
    this.errorMessage = 'Updated'
    this.button = 'Update'
    let payload = {
      "ID": this.inspectionId
    }
    this.workshopService.getInspection(payload).subscribe((res: any) => {
      this.inspectionList = res?.body;
      this.inspectionList.forEach((val:any)=>{

        let serviceValue = this.serviceList?.filter((ele: any) => ele?.text == val?.serviceType);        
        serviceValue?.forEach((data: any) => {
          this.selectedValue = data
        });

        this.InspectionForm = this.fb.group({
          name: [val?.description, [Validators.required, Validators.pattern('')]],
          rate: [val?.rate, [Validators.required, Validators.pattern('')]],
          standard_timing: [new Date(val?.standardTiming), [Validators.required, Validators.pattern('')]],
          service_type: ['', [Validators.required, Validators.pattern('')]]
        })
      })
    });
  }

  getSerivice() {
    let newData = {
      value: '',
      text: ''
    }
    this.workshopService.getServiceType().subscribe((res: any) => {
      let data = res?.body;
      this.serviceList = data?.map((val: any) =>
        newData = {
          value: val?.Key,
          text: val?.Value
        })
        
    });
  }

  confirm(event: any) {
    this.serviceType = event.id
    this.InspectionForm.controls['service_type'].setValue(event.id)
  }


  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.InspectionForm.reset()
  }


  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
}
