import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';
import { StockService } from '../../../services/stock.service';
import { SharedService } from 'src/app/features/http-services/shared.service';

@Component({
  selector: 'app-level-mapping',
  templateUrl: './level-mapping.component.html',
  styleUrls: ['./level-mapping.component.scss']
})
export class LevelMappingComponent {
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
  levelMappigForm!: FormGroup
  levelMappingList: any;
  isloading: boolean = false;
  button: any = 'Add'
  alertMessage: string = 'Added';
  levelId: any;
  bsModalRef!: BsModalRef
  selectedValue: any;
  department: any;
  selectedRole: any;
  selectedemployee: any;
  selectedLevel: any;
  roleList: any
  employeeList: any;
  levelList: any;
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
    this.getLevelDD()
    this.getMappingList('')
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'S. No.' },
      { key: '', value: 'Level Name' },
      { key: '', value: 'Role' },
      { key: '', value: 'Employee' },
      { key: '', value: 'Email' },
      { key: '', value: 'SMS' },
      { key: '', value: 'Whatsapp' },
      { key: '', value: 'Action' },
    ]
  }

  /**
*get department data
*/


  setInitialValue() {
    this.levelMappigForm = this.fb.group({
      dept: [null, [Validators.required]],
      role: [null, [Validators.required]],
      emp: [null, [Validators.required]],
      level: [null, [Validators.required]],
      email: [false],
      sms: [false],
      whatsapp: [false],
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

  getLevelDD() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "pk_Level_id": 0
    }
    this.stockService.levelList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.levelList = data.map((val: any) =>
        newData = {
          value: val?.pk_Level_id,
          text: val?.level_name
        }
      )

    })
  }
  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data
    });
  }

  private async getRoleDD(deptId: any): Promise<any[]> {
    return new Promise(resolve => {
      this.stockService.depyByRollList(deptId).subscribe({
        next: (res: any) => {
          this.roleList = (res?.body?.data || []).map(val => ({
            value: val.roleId,
            text: val.roleName
          }));
          resolve(this.roleList);
        },
        error: err => {
          console.error('Role API error:', err);
          this.roleList = [];
          resolve([]);
        }
      });
    });
  }

  private async getEmployeeDD(roleId: any): Promise<any[]> {
    return new Promise(resolve => {
      this.stockService.rollListByemployee(roleId).subscribe({
        next: (res: any) => {
          this.employeeList = (res?.body?.data || []).map(val => ({
            value: val.employeeId,
            text: val.employeeName
          }));
          resolve(this.employeeList);
        },
        error: err => {
          console.error('Employee API error:', err);
          this.employeeList = [];
          resolve([]);
        }
      });
    });
  }


  async update(item: any): Promise<void> {
    this.levelId = item.pk_Level_Emp_id;
    this.button = 'Update';
    this.alertMessage = 'Updated';

    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // 1️⃣ Match and set Department
      const deptMatch = this.department?.find((ele: any) => ele?.value == item?.fk_dept_id);
      console.log('deptMatch', deptMatch);

      this.selectedValue = deptMatch;
      this.levelMappigForm.get('dept')?.setValue(deptMatch?.value);

      // 2️⃣ Load and match Role
      await this.getRoleDD(deptMatch?.value);
      const roleMatch = this.roleList?.find((ele: any) => ele?.value === item?.fk_role_id);
      this.selectedRole = roleMatch;
      this.levelMappigForm.get('role')?.setValue(roleMatch?.value);

      // 3️⃣ Load and match Employee
      await this.getEmployeeDD(roleMatch?.value);
      const empMatch = this.employeeList?.find((ele: any) => ele?.value === item?.fk_emp_id);
      this.selectedemployee = empMatch;
      this.levelMappigForm.get('emp')?.setValue(empMatch?.value);

      // 4️⃣ Match and set Level (no dependency)
      const levelMatch = this.levelList?.find((ele: any) => ele?.value === item?.fk_level_id);
      this.selectedLevel = levelMatch;
      this.levelMappigForm.get('level')?.setValue(levelMatch?.value);

      // 5️⃣ Patch checkbox fields
      this.levelMappigForm.patchValue({
        email: item?.via_email,
        sms: item?.via_sms,
        whatsapp: item?.via_whatsapp
      });

    } catch (error) {
      console.error('Error in update:', error);
    }
  }

  submit(formvalue: any) {

    if (this.levelMappigForm.invalid) {
      this.levelMappigForm.markAllAsTouched();
      return;
    };
    let service: any
    let payload: any
    if (this.levelId) {
      payload = {
        "pk_Level_Emp_id": Number(this.levelId),
        "via_email": formvalue?.email,
        "via_sms": formvalue?.sms,
        "via_whatsapp": formvalue?.whatsapp,
        "Logged_by": Number(localStorage.getItem('user_Id') || ''),
        "IsActive": true
      }
      service = this.stockService.updateLevelMapping(payload)
    } else {
      payload = {
        "fk_level_id": Number(formvalue?.level),
        "fk_dept_id": Number(formvalue?.dept),
        "fk_role_id": Number(formvalue?.role),
        "fk_emp_id": Number(formvalue?.emp),
        "via_email": formvalue?.email,
        "via_sms": formvalue?.sms,
        "via_whatsapp": formvalue?.whatsapp,
        "Logged_by": Number(localStorage.getItem('user_Id') || '')
      }
      service = this.stockService.createLevelMapping(payload)
    }
    service.subscribe((res: any) => {
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
        this.levelId = null
        this.resetForm()
        // this.selectedRole = null
        // this.selectedValue = null
        // this.selectedemployee = null
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
      "pk_Level_Emp_id": empid ? Number(empid) : 0
    }
    this.stockService.levelMappingList(payload).subscribe((res: any) => {
      this.levelMappingList = res?.body?.data;
      this.isloading = false;
    })
  }


  confirm(event: any) {
    if (event.selectType === 'Department') {
      this.levelMappigForm.controls['dept'].setValue(event.id);
      this.getRoleDD(event.id);
      this.selectedRole = null
      this.selectedemployee = null
      this.levelMappigForm.controls['role'].setValue(null);
      this.levelMappigForm.controls['emp'].setValue(null);
    } else if (event.selectType === 'Role') {
      this.selectedemployee = null
      this.employeeList = []
      this.levelMappigForm.controls['role'].setValue(event.id);
      this.getEmployeeDD(event.id);
      this.levelMappigForm.controls['emp'].setValue(null);
    } else if (event.selectType === 'Employee') {
      this.levelMappigForm.controls['emp'].setValue(event.id);
    } else if (event.selectType === 'Level') {
      this.levelMappigForm.controls['level'].setValue(event.id);
      this.getMappingList(event.id)
    }
  }

  deleteLevelMapping(item: any) {
    let payload = {
      "pk_Level_Emp_id": Number(item?.pk_Level_Emp_id),
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.stockService.deleteLevelMapping(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.level_Name,
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
    this.levelList = []
    this.selectedemployee = null
    this.selectedRole = null
    this.selectedValue = null
    this.selectedLevel = null
    this.levelMappigForm.reset()
    this.departmentData()
    this.getLevelDD()
  }
}
