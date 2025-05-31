import { Location, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TyreService } from '../services/tyre.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-tyre-master',
  templateUrl: './add-tyre-master.component.html',
  styleUrls: ['./add-tyre-master.component.scss']
})
export class AddTyreMasterComponent {
  tyreForm !: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  selectedTyreValue: any;
  tyreId: any;
  button: any = 'Add';

  constructor(
    private fb: FormBuilder,
    private tyreService: TyreService,
    private route: Router,
    private location : Location,
    private activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.tyreId = this.activeRoute.snapshot.paramMap.get('id')
    this.selectedTyreValue = this.location.getState();
    console.log(this.selectedTyreValue);
    
    this.setInitialValue();
  }

  setInitialValue() {
    if(this.tyreId) {
      this.button = 'Update'
      this.tyreForm = this.fb.group({
        tyre_type: [this.selectedTyreValue?.tyreData?.tyrE_TYPE, [Validators.required, Validators.pattern('')]],
        tyre_number: [this.selectedTyreValue?.tyreData?.tyrE_NO, [Validators.required, Validators.pattern('')]],
        tyre_make: [this.selectedTyreValue?.tyreData?.tyrE_MAKE, [Validators.required, Validators.pattern('')]],
        Warranty: [this.selectedTyreValue?.tyreData?.warranty, [Validators.required, Validators.pattern('')]],
        tyre_category: ['1', [Validators.required, Validators.pattern('')]],
        status: [this.selectedTyreValue?.tyreData?.status, [Validators.required, Validators.pattern('')]],
        invoice_number: [this.selectedTyreValue?.tyreData?.invoicE_NO, [Validators.required, Validators.pattern('')]],
        invoice_date: [new Date(this.selectedTyreValue?.tyreData?.tyrE_PURCHASE_DATE), [Validators.required, Validators.pattern('')]],
        cost: [this.selectedTyreValue?.tyreData?.cosT_OF_TYRE, [Validators.required, Validators.pattern('')]],
        Nsd_O: [this.selectedTyreValue?.tyreData?.tyrE_NSD_O, [Validators.required, Validators.pattern('')]],
        Nsd_M: [this.selectedTyreValue?.tyreData?.tyrE_NSD_M, [Validators.required, Validators.pattern('')]],
        Nsd_I: [this.selectedTyreValue?.tyreData?.tyrE_NSD_I, [Validators.required, Validators.pattern('')]],
        Nsd_MM: [this.selectedTyreValue?.tyreData?.tyrE_NSD_MM, [Validators.required, Validators.pattern('')]],
        // tag_no: [this.selectedTyreValue?.tyreData?.taG_NO, [Validators.required, Validators.pattern('')]],
      })
    } else {

      this.tyreForm = this.fb.group({
        // zone_name: ['46', [Validators.required, Validators.pattern('')]],
        tyre_type: ['Radial', [Validators.required, Validators.pattern('')]],
        tyre_number: ['', [Validators.required, Validators.pattern('')]],
        tyre_make: ['MRF', [Validators.required, Validators.pattern('')]],
        Warranty: ['1', [Validators.required, Validators.pattern('')]],
        tyre_category: ['1', [Validators.required, Validators.pattern('')]],
        status: ['0', [Validators.required, Validators.pattern('')]],
        invoice_number: ['', [Validators.required, Validators.pattern('')]],
        invoice_date: [new Date(), [Validators.required, Validators.pattern('')]],
        cost: ['', [Validators.required, Validators.pattern('')]],
        Nsd_O: ['', [Validators.required, Validators.pattern('')]],
        Nsd_M: ['', [Validators.required, Validators.pattern('')]],
        Nsd_I: ['', [Validators.required, Validators.pattern('')]],
        Nsd_MM: ['', [Validators.required, Validators.pattern('')]],
        // tag_no: ['', [Validators.required, Validators.pattern('')]],
        // image: ['', [Validators.required, Validators.pattern('')]],
      })
    }
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(value: any) {
    let payload = {
      "MODE": 0,
      "TYRE_ID": 0,
      "DEPOT_ID": parseInt(localStorage.getItem('dept_id')),
      "TYRE_TYPE": value?.tyre_type,
      "TYRE_NO": value?.tyre_number,
      "TYRE_MAKE": value?.tyre_make,
      "TYRE_PURCHASE_DATE": formatDate(value?.invoice_date, 'MM/dd/yyyy', 'en-US'),
      "STATUS": parseInt(value.status),
      "CREATED_BY": 1,
      "Warranty": parseInt(value?.Warranty),
      "Invoice_No": value?.invoice_number,
      "STOCK_TYRE": "",
      "COST_OF_TYRE": value?.cost,
      "TYRE_NSD": 0,
      "TYRE_NSD_O": value?.Nsd_O,
      "TYRE_NSD_M": value?.Nsd_M,
      "TYRE_NSD_I": value?.Nsd_I,
      "TYRE_NSD_MM": value?.Nsd_MM,
      "TAG_NO": "",
      "RESULT": ""
    }
    if(this.tyreId) {
      payload['MODE'] = 1;
      payload['TYRE_ID'] = Number(this.tyreId)

    }
    this.tyreService.addTyre(payload).subscribe((result: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (result?.body?.status == 'Success') {
        this.alertData = {
          message: result?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        setTimeout(() => {
          this.route.navigateByUrl('/Maintenance/TyreMaster')
        }, 2000)
      } else {
        this.alertData = {
          message: 'Data not Added',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }

    })

  }

  cancel() {
    this.tyreForm.reset();
    this.setInitialValue();
  }

}
