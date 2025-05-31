import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-unit-conversion',
  templateUrl: './add-unit-conversion.component.html',
  styleUrls: ['./add-unit-conversion.component.scss']
})
export class AddUnitConversionComponent implements OnInit {
  unitConversionform!: FormGroup;
  unitData: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  id: string;
  unitConversionData: any;
  button: string = 'Add';
  alertMessage: string = 'Added'
  selectedData: any;
  selectedValue: any;
  isloading: boolean = false
  constructor(
    private fb: FormBuilder,
    private stockServie: StockService,
    private activeUrl: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.isloading = true;
    this.getUnitList()

    this.id = this.activeUrl.snapshot.paramMap.get("id");
    if (this.id) {
      setTimeout(() => {
        this.getUnitConversionList();
      }, 500)
      this.button = 'Update';
      this.alertMessage = 'Update'
    }
    this.setInitialValue();
    setTimeout(() => {
      this.isloading = false
    }, 500);
  }

  setInitialValue() {
    this.unitConversionform = this.fb.group({
      baseunitName: ['', [Validators.required, Validators.pattern('')]],
      subUnitName: ['', [Validators.required, Validators.pattern('')]],
      conversionFactor: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  confirm(event: any) {
    if (event.selectType == 'baseUnit') {
      this.unitConversionform.controls['baseunitName'].setValue(event.id)
    }
  }

  getUnitConversionList() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": parseInt(this.id)

    }
    this.stockServie.unitConversion(payload).subscribe((res: any) => {
      this.unitConversionData = res?.body?.data;
      this.unitConversionData?.forEach((ele: any) => {
        if (ele?.id == this.id) {
          this.selectedData = ele;
          let newUnitValue = this.unitData?.filter((val: any) => val?.value == ele?.baseUnitID);
          newUnitValue?.forEach((data: any) => {
            this.selectedValue = data
          });

          this.unitConversionform = this.fb.group({
            baseunitName: ['', [Validators.required, Validators.pattern('')]],
            subUnitName: [ele?.subUnitID, [Validators.required, Validators.pattern('')]],
            conversionFactor: [ele?.conversion_Factor, [Validators.required, Validators.pattern('')]]
          })

          this.unitConversionform.controls['baseunitName'].setValue(ele?.baseUnitID)
        }
      })
      this.isloading = false;

    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  getUnitList() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "braid": "ADS-B1",
      "Mode": "SELECT"
    }

    this.stockServie.unitList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.unitData = data.map((val: any) =>
        newData = {
          value: val?.unitID,
          text: val?.unitName
        }
      )
    })
  }



  submit(formvalue: any) {
    let payload: any
    payload = {
      "BaseUnitID": formvalue?.baseunitName,
      "SubUnitID": formvalue?.subUnitName,
      "Conversion_Factor": parseInt(formvalue?.conversionFactor),
      "BranchID": "",
      "Status": 1,
      "mode": "INSERT"
    }

    if (this.id) {
      payload.id = parseInt(this.id);
      payload.mode = "UPDATE";
      payload.BranchID = ""
      payload["Unit_ConversionID"] =this.selectedData?.unit_ConversionID

    }

    this.stockServie.addunitConversion(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        setTimeout(() => {
          this.route.navigateByUrl('/SupplyChain/Master_Unit_Conversion_List')
        }, 3000)
      } else {
        this.alertData = {
          message: `Data not {alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  cancel(){
    this.unitConversionform.reset()
  }
}
