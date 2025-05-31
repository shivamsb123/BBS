import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-hsn',
  templateUrl: './add-hsn.component.html',
  styleUrls: ['./add-hsn.component.scss']
})
export class AddHSNComponent implements OnInit {

  hsnForm!: FormGroup
  isloading: boolean = false
  hsnData: any;
  id: any;
  disabled: boolean = true;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage = 'Added';
  button = 'Add';
   submitted: boolean = true;
  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.getHSNListById()
      this.alertMessage = "Updated";
      this.button = 'Update'
    }
    this.setInitialValue()
  }

  setInitialValue() {
    this.hsnForm = this.fb.group({
      hsnCode: ['', [Validators.required, Validators.pattern('')]],
      Description: ['', [Validators.required, Validators.pattern('')]],
      cgst: ['', [Validators.required, Validators.max(100)]],
      igst: ['', [Validators.required, Validators.max(100)]],
      sgst: ['', [Validators.required, Validators.max(100)]],
    
    })

  }


  getHSNListById() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": parseInt(this.id)
    }
    this.stockService.hsnList(payload).subscribe((res: any) => {
      this.hsnData = res?.body?.data;
      this.hsnData.forEach((val: any) => {
        this.hsnForm = this.fb.group({
          hsnCode: [val?.hsn, [Validators.required, Validators.pattern('')]],
          Description: [val?.description, [Validators.required, Validators.pattern('')]],
          cgst: [val?.cgstRate, [Validators.required, Validators.max(100)]],
          igst: [val?.igstRate, [Validators.required, Validators.max(100)]],
          sgst: [val?.sgstRate, [Validators.required, Validators.max(100)]],
 
        })
      })

      this.isloading = false;
    })
  }


  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formValue: any) {
    this.submitted = true;
    if(formValue.cgst > 100 && formValue.cgst > 100 && formValue.cgst > 100) return;

    let payload = {
      "HsnID": "",
      "HSN": formValue?.hsnCode,
      "Description": formValue?.Description,
      "IsActive": 1,
      "cgst": formValue?.cgst,
      "sgst": formValue?.sgst,
      "igst": parseInt(formValue?.igst) ,
      "Mode": "INSERT"
    }
    if(this.id){
      payload['HsnID'] = (this.id);
      payload['Mode'] = "UPDATE"
    }
        
    this.stockService.addHSN(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.hsnForm.reset();
        setTimeout(() => {
          this.router.navigateByUrl('/SupplyChain/HSNMaster_List')
        },2000)
      } else {
        this.alertData = {
          message: `Data not ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }

    })


  }
  cancel() {
    this.hsnForm.reset()
  }
}
