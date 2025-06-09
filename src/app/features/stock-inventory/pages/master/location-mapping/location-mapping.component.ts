import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { StockService } from '../../../services/stock.service';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-location-mapping',
  templateUrl: './location-mapping.component.html',
  styleUrls: ['./location-mapping.component.scss']
})
export class LocationMappingComponent {
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
  locationMappigForm!: FormGroup
  locationMappingList: any;
  isloading: boolean = false;
  button: any = 'Add'
  alertMessage: string = 'Added';
  locationId: any;
  bsModalRef!: BsModalRef
  selectedValue: any;
  department: any;
  selectedRole: any;
  selectedemployee: any;
  selectedLocation: any;
  roleList: any
  employeeList: any;
  locationList: any
  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private modalService: BsModalService,
    private shardService: SharedService,

  ) { }
  ngOnInit(): void {
    this.setInitialValue();
    this.setInitialTable();
    this.departmentData()
    this.getLocationDD()
    this.getMappingList('')
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'S. No.' },
      { key: '', value: 'Location Name' },
      { key: '', value: 'Role' },
      { key: '', value: 'Employee' },
      { key: '', value: 'Is Active' },
      { key: '', value: 'Action' },
    ]
  }

  /**
*get department data
*/


  setInitialValue() {
    this.locationMappigForm = this.fb.group({
      dept: [null, [Validators.required]],
      role: [null, [Validators.required]],
      emp: [null, [Validators.required]],
      location: [null, [Validators.required]],
    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  getLocationDD() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "pk_location_id": 0
    }
    this.stockService.locationList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.locationList = data.map((val: any) =>
        newData = {
          value: val?.pk_location_id,
          text: val?.location_name
        }
      )

    })
  }
  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data
    });
  }

  getRoleDD(deptId: any) {
    let newData = {
      value: '',
      text: ''
    }
    this.stockService.depyByRollList(deptId).subscribe((res: any) => {
      let data = res?.body?.data;
      this.roleList = data.map((val: any) =>
        newData = {
          value: val.roleId,
          text: val.roleName
        }
      )
    })
  }

  getEmployeeDD(roleId: any) {
    let newData = {
      value: '',
      text: ''
    }
    this.stockService.rollListByemployee(roleId).subscribe((res: any) => {
      let data = res?.body?.data;
      this.employeeList = data.map((val: any) =>
        newData = {
          value: val.employeeId,
          text: val.employeeName
        }
      )
    })
  }

  submit(formvalue: any) {

    if (this.locationMappigForm.invalid) {
      this.locationMappigForm.markAllAsTouched();
      return;
    };
    let payload = {
      "fk_location_id": Number(formvalue?.location),
      "fk_emp_id": Number(formvalue?.emp),
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    this.stockService.createLocationMapping(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.getMappingList('');
        this.resetForm()
        this.button = 'Add'
      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
        this.alertMessage = 'Added'
      }

    })
  }

  getMappingList(empid: any) {
    this.isloading = true;
    let payload = {
      "fk_location_id": empid ? Number(empid) : 0
    }
    this.stockService.locationMappingList(payload).subscribe((res: any) => {
      this.locationMappingList = res?.body?.data;
      this.isloading = false;
    })
  }


  confirm(event: any) {
    if (event.selectType === 'Department') {
      this.locationMappigForm.controls['dept'].setValue(event.id);
      this.getRoleDD(event.id);
      // this.selectedRole = null
      // this.selectedemployee = null
      this.locationMappigForm.controls['role'].setValue(null);
      this.locationMappigForm.controls['emp'].setValue(null);
    } else if (event.selectType === 'Role') {
      // this.selectedemployee = null
      this.employeeList = []
      this.locationMappigForm.controls['role'].setValue(event.id);
      this.getEmployeeDD(event.id);
      this.locationMappigForm.controls['emp'].setValue(null);
    } else if (event.selectType === 'Employee') {
      this.locationMappigForm.controls['emp'].setValue(event.id);
    } else if (event.selectType === 'Location') {
      this.locationMappigForm.controls['location'].setValue(event.id);
      this.getMappingList(event.id)
    }
  }

  updateLocationMapping(item: any) {
    let payload = {
      "pk_Location_Emp_id": Number(item?.pk_Location_Emp_id),
      "IsActive": item?.isActive == true ? false : item?.isActive == false ? true : '',
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.stockService.updateLocationMapping(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.location_Name,
        content: 'Are you sure you want to Update?',
        primaryActionLabel: 'Yes',
        secondaryActionLabel: 'No',
        service: url
      },
    };
    this.bsModalRef = this.modalService.show(
      DeleteConfirmationComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
        if (value?.body?.status == 'success') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          this.alertData = {
            message: value?.body?.alert
          };
          this.alertType = "success";
          this.alertTrigger = true;
          this.stopAlert();
          this.resetForm()
          this.getMappingList('');
        } else {
          this.alertData = {
            message: `Data Not ${this.alertMessage}`
          };
          this.alertType = "danger";
          this.alertTrigger = true;
          this.stopAlert();
        }
      }
    );
  }

  deleteLocationMapping(item: any) {
    let payload = {
      "pk_Location_Emp_id": Number(item?.pk_Location_Emp_id),
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.stockService.deleteLocationlMapping(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.location_Name,
        content: 'Are you sure you want to delete?',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel',
        service: url
      },
    };
    this.bsModalRef = this.modalService.show(
      DeleteConfirmationComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
        if (value?.body?.status == 'success') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          this.alertData = {
            message: value?.body?.alert
          };
          this.alertType = "success";
          this.alertTrigger = true;
          this.stopAlert();
          this.resetForm()
          this.getMappingList('');
        } else {
          this.alertData = {
            message: `Data Not ${this.alertMessage}`
          };
          this.alertType = "danger";
          this.alertTrigger = true;
          this.stopAlert();
        }
      }
    );
  }
  resetForm() {
    this.department = []
    this.roleList = []
    this.employeeList = []
    this.locationList = []
    this.selectedemployee = null
    this.selectedRole = null
    this.selectedValue = null
    this.selectedLocation = null
    this.locationMappigForm.reset()
    this.departmentData()
    this.getLocationDD()
  }
}
