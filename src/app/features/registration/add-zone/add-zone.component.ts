import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../services/registration.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.scss']
})
export class AddZoneComponent implements OnInit {
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  isloading: boolean = false;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  addZone!: FormGroup
  department: any;
  zoneList: any;
  zoneId: number = 0;
  button: string = 'Add';
  mode = 1
  dePtName: any;
  selectedValue: any;

  // deleteZoneData!: BsModalRef;
  // message:string = 'Do you want delete this record?';

  constructor(
    private fb: FormBuilder,
    private shardService: SharedService,
    private registrationService: RegistrationService,
    private modalService: BsModalService
  ) { }
  ngOnInit(): void {
    this.departmentData();
    this.setInitialTable();
    this.setInitialValue();
    this.getZoneList(0)
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Department' },
      { key: '', value: 'Zone Code' },
      { key: '', value: 'Zone Name' },
    ]
  }

  /**
*get department data
*/
  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }

  setInitialValue() {
    this.addZone = this.fb.group({
      department: ['', [Validators.required, Validators.pattern('')]],
      dept_code: ['', [Validators.required, Validators.pattern('')]],
      dept_name: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  getZoneList(id: any) {
    this.isloading = true;
    let payload = {
      "EXCLUDE_VEHICLES": 1,
      User_ID: parseInt(localStorage.getItem('user_Id') || ''),
      DEPT_ID: parseInt(localStorage.getItem('dept_id') || ''),
      ZONE_ID: id
    }
    this.registrationService.zoneList(payload).subscribe((res: any) => {
      this.zoneList = res?.body?.data;
      this.isloading = false;

    })

  }

  update(id: any, dept_name: any) {
    this.zoneId = id;
    this.mode = 0;
    this.button = 'Update';
    this.dePtName = dept_name

    if (this.zoneId) {
      this.zoneList.forEach((val: any) => {
        if (val?.zone_ID == this.zoneId) {
          console.log("check val", val);

          let newDepartment = this.department?.filter((ele: any) => ele?.text == val?.depT_NAME);
          newDepartment?.forEach((data: any) => {
            this.selectedValue = data
          });

          this.addZone = this.fb.group({
            department: [val?.dept_ID, [Validators.required, Validators.pattern('')]],
            dept_code: [val?.zone_Code, [Validators.required, Validators.pattern('')]],
            dept_name: [val?.zonE_NAME, [Validators.required, Validators.pattern('')]],
          })
        }
      })
    }

  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }


  submit(formvalue: any) {
    let payload: any;
    let service: any;
    if (this.mode == 1) {
      payload = {
        Mode: this.mode,
        Zone_Code: formvalue.dept_code,
        Zone_Name: formvalue.dept_name,
        Dept_ID: parseInt(formvalue.department || ''),
        Result: ''
      }
      service = this.registrationService.addZone(payload)
    } else {
      payload = {
        "Zone_ID": this.zoneId,
        "Mode": this.mode,
        Zone_Code: formvalue.dept_code,
        Zone_Name: formvalue.dept_name,
        Dept_ID: parseInt(formvalue.department || ''),
        Result: ''
      }
      service = this.registrationService.updateZone(payload)
    }

    service.subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.getZoneList(0);
        this.button = 'Add';
        this.addZone.reset()
        this.selectedValue = {
          value: '',
          text: ''
        }
      } else {
        this.alertData = {
          message: 'Zone Not Added',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  /**
  * open vehicle data confimation popup
  * @param template 
  */
  //  deleteZoneDataModal(template:TemplateRef<any>){
  //   this.deleteZoneData = this.modalService.show(template);
  // }


  /*
  * on confirm delete vehicle data
  * @param evnet 
  */
  //  confirmDelete(evnet:any) {
  //    let index = evnet;
  //    console.log('check index data',index);

  //  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  confirm(event: any) {
    this.addZone.controls['department'].setValue(event.id)
  }
  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.addZone.reset()
  }
}
