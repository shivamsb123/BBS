import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TyreService } from '../services/tyre.service';
import { SharedService } from '../../http-services/shared.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-damage-tyre',
  templateUrl: './damage-tyre.component.html',
  styleUrls: ['./damage-tyre.component.scss']
})
export class DamageTyreComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  damageForm!: FormGroup
  selectedIndex: any;
  isSelectedAll: any;
  damageTyreData: any;
  tyrNumberList: any;
  vehicleData: any;
  vehicleNo: any;
  tyreNoVehicleWise: any;
  selectedTyreValue: any
  selectedVehicleValue: any
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  tyreId: any;
  button: any = 'Add';

  constructor(
    private fb: FormBuilder,
    private tyreService: TyreService,
    private shardService: SharedService
  ) { }

  ngOnInit(): void {
    this.setInitialvalue()
    this.initialTable()
    this.getVehicleZoneData()
    this.getDamageTyre()
    if (this.tyreId) {

    }
  }

  setInitialvalue() {
    this.damageForm = this.fb.group({
      vehicleNo: ['', [Validators.required, Validators.pattern('')]],
      tyre_number: ['', [Validators.required, Validators.pattern('')]],
      tyre_make: ['', [Validators.required, Validators.pattern('')]],
      tyre_type: ['', [Validators.required, Validators.pattern('')]],
      location: ['', [Validators.required, Validators.pattern('')]],
      received_date: [new Date(), [Validators.required, Validators.pattern('')]],
    })

  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle No.' },
      { key: 'keyValue', val: 'Received Date' },
      { key: 'keyValue', val: 'Tyre No' },
      { key: 'keyValue', val: 'Tyre Make' },
      { key: 'keyValue', val: 'Tyre Type' },
      { key: 'keyValue', val: 'Location' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  getTyreNumber() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "ASSET_NO": this.vehicleNo,
      "Result": ""
    }
    this.tyreService.tyreVehicleWise(payload).subscribe((res: any) => {
      this.tyreNoVehicleWise = res?.body?.data;
      let data = res?.body?.data;
      this.tyrNumberList = data?.map((val: any) =>
        newData = {
          value: val?.tyre_Id,
          text: val?.tyre_No
        })
    })
  }


  submit(formvalue: any) {
    this.button = 'Add'
    let payload = {
      "Mode": 0,
      "Id": 0,
      "Vehicle_No": formvalue?.vehicleNo,
      "Tyre_No": formvalue?.tyre_number,
      "Tyre_Make": formvalue?.tyre_make,
      "Tyre_Type": formvalue?.tyre_type,
      "Location": formvalue?.location,
      "Received_Date": formatDate(formvalue?.received_date, 'dd-MM-yyyy', 'en-US'),
      "Status": "",
      "RESULT": ""
    }
    if (this.tyreId) {
      payload['Mode'] = 1
      payload['Id'] = this.tyreId
    }

    this.tyreService.addDamageTyre(payload).subscribe((res: any) => {
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
          this.getDamageTyre()
        }, 2000);

      } else {
        this.alertData = {
          message: 'Data Not Added',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
    this.selectedVehicleValue = {
      value: '',
      text: ''
    }
    this.selectedTyreValue = {
      value: '',
      text: ''
    }
    this.damageForm.reset()
  }

  updateDamageTyre(id: any) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.tyreId = id
    this.button = 'Update'
    this.damageTyreData?.forEach((val: any) => {
      if (this.tyreId == val?.id) {
      
      setTimeout(() => {
        let newVehicleValue = this.vehicleData?.filter((ele: any) => ele?.text == val?.vehicle_No);
        newVehicleValue.forEach((data: any) => {
          this.selectedVehicleValue = data
        });

        let newTyrenumber = this.tyrNumberList?.filter((ele: any) => ele?.text == val?.tyre_No)
        newTyrenumber?.forEach((data: any) => {
          this.selectedTyreValue = data
        })
      }, 1000);
         
        this.damageForm = this.fb.group({
          vehicleNo: ['', [Validators.required, Validators.pattern('')]],
          tyre_number: ['', [Validators.required, Validators.pattern('')]],
          tyre_make: [val?.tyre_Make, [Validators.required, Validators.pattern('')]],
          tyre_type: ['', [Validators.required, Validators.pattern('')]],
          location: [val?.location, [Validators.required, Validators.pattern('')]],
          received_date: [new Date(val?.received_Date), [Validators.required, Validators.pattern('')]],
        })
        this.damageForm.controls['vehicleNo'].setValue(val?.vehicle_No)
        this.vehicleNo = val?.vehicle_No;

        // this.getTyreNumber()
      }
    })
  }

  getDamageTyre() {
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Id": 0
    }
    this.tyreService.damageTyreList(payload).subscribe((res: any) => {
      this.damageTyreData = res?.body?.data
    })
  }

  confirm(event: any) {
    if (event.selectType == 'Vehicle') {
      this.vehicleNo = event.assets_no
      if(this.vehicleNo){
        this.getTyreNumber()
      }
      this.damageForm.controls['vehicleNo'].setValue(this.vehicleNo)
    } else if (event.selectType == 'tyre') {
      this.damageForm.controls['tyre_number'].setValue(event.assets_no)
    }
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

  isAllSelected(event: any, index: any, data: any) {
    this.selectedIndex = event.target.checked ? index : undefined;
    if (this.selectedIndex !== undefined) {
      this.isSelectedAll = data;
    } else {
      this.isSelectedAll = {};
    }
  }


  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  cancel() {
    this.selectedVehicleValue = {
      value: '',
      text: ''
    }
    this.selectedTyreValue = {
      value: '',
      text: ''
    }
    this.damageForm.reset()
  }

}
