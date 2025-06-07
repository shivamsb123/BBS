import { Component } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../http-services/notification.service';

@Component({
  selector: 'app-menu-master',
  templateUrl: './menu-master.component.html',
  styleUrls: ['./menu-master.component.scss']
})
export class MenuMasterComponent {

  moduleList: any;
  selectModuleId: any;
  tableData: any
  menuList: any;
  searchKeyword: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  isloading: boolean = false;
  selectedValue: any;
  menuform!: FormGroup;
  selectedMenuData: any;
  selectedModule: any
  mainModuleList: any;
  selectedModuleMenu: any
  moduleMenuList: any;
  selectMenuId: any;
  moduleSubmenuList: any;
  selectedSubmenu: any
  button: any = 'Add'
  constructor(
    private managementService: ManagementService,
    private fb: FormBuilder,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.initializeForm()
    this.getModuleList();
    this.setInitialValue();;
    this.getMainmoudleList()
  }

  initializeForm() {
    this.menuform = this.fb.group({
      module: [null, [Validators.required]],
      moduleSubMenu: [null],
      menuName: ['', [Validators.required]],
      url: ['', [Validators.required, Validators.pattern('.*\\.aspx$')]],
      order: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: ['', Validators.required]
    });
  }

  // To easily check if the form control has any errors
  hasError(controlName: string, errorName: string) {
    return this.menuform.get(controlName)?.hasError(errorName) && this.menuform.get(controlName)?.touched;
  }

  setInitialValue() {
    this.tableData = [
      { key: 'keyValue', val: 'Module Name' },
      { key: 'keyValue', val: 'Menu Name' },
      { key: 'keyValue', val: 'Display Order' },
      { key: 'keyValue', val: 'Status' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getModuleList() {
    let newData = {
      value: "",
      text: ""
    }
    this.managementService.moduleList().subscribe((res: any) => {
      let data = res?.body;
      this.moduleList = data?.map((val: any) =>
        newData = {
          value: val?.module_ID,
          text: val?.module_Name
        });
      if (this.moduleList && this.moduleList.length > 0) {
        this.selectedValue = {
          value: this.moduleList[0]?.value,
          text: this.moduleList[0]?.text
        }
        this.selectModuleId = this.selectedValue.value;
        this.getMoudleMenuList(this.selectModuleId)
        if (this.selectModuleId) {
          this.getMenuList()
        }
      }
    })

  }

  getMainmoudleList() {
    let newData = {
      value: "",
      text: ""
    }
    this.managementService.moduleList().subscribe((res: any) => {
      let data = res?.body;
      this.mainModuleList = data?.map((val: any) =>
        newData = {
          value: val?.module_ID,
          text: val?.module_Name
        });
      if (this.selectedMenuData) {
        this.getSubmenuList(this.selectedMenuData?.menuId)
      }
    })
  }

  getMoudleMenuList(moduleId: any) {
    let newData = {
      value: "",
      text: ""
    }
    this.managementService.moduleMenuList(moduleId).subscribe((res: any) => {
      let data = res?.body?.data;
      this.moduleMenuList = data?.map((val: any) =>
        newData = {
          value: val?.moduleMenuId,
          text: val?.moduleMenuName
        });
    })
  }
  getSubmenuList(moduleId: any) {
    let newData = {
      value: "",
      text: ""
    }
    this.managementService.moduleMenuList(moduleId).subscribe((res: any) => {
      let data = res?.body?.data;
      this.moduleSubmenuList = data?.map((val: any) =>
        newData = {
          value: val?.moduleMenuId,
          text: val?.moduleMenuName
        });
      this.selectedSubmenu = this.moduleSubmenuList?.find((val: any) => val?.value === this.selectedMenuData?.subMenuId);
    })
  }

  confirm(event: any) {
    if (event.selectType == "Module") {
      this.selectModuleId = event?.id;
      this.getMoudleMenuList(event?.id)
      this.getMenuList()
      this.selectedMenuData = null
      this.menuform.reset();
      this.button = 'Add'
    } else if (event.selectType == "addModule") {
      this.menuform.get('module').patchValue(event.id);
      this.getSubmenuList(event.id)
    } else if (event.selectType == "Module-menu") {
      this.selectMenuId = event?.id;
      this.getMenuList()
      this.selectedMenuData = null
      this.menuform.reset();
      this.button = 'Add'
    } else if (event.selectType == "Module-sub-menu") {
      this.menuform.get('moduleSubMenu').patchValue(event.id);
    } else {
      this.selectedMenuData = null
    }

  }

  getMenuList() {
    this.isloading = true;
    let payload = {
      "ModuleId": Number(this.selectModuleId),
      "MenuId": this.selectMenuId ? Number(this.selectMenuId) : 0
    }
    this.page = 1
    this.managementService.menuList(payload).subscribe((res: any) => {
      this.isloading = false
      this.menuList = res?.body?.data;
    })
  }

  /**
* tabel size chage method
* @param event 
*/
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  };

  submit(formvalue: any) {
    if (this.menuform.valid) {
      let message: any;
      let errorMessage: any;
      let payload: any;
      let service: any;

      if (this.selectedMenuData?.menuId) {
        payload = {
          "MenuId": Number(this.selectedMenuData?.menuId),
          "SubMenuId": Number(this.selectedMenuData?.subMenuId),
          "Menu_Name": formvalue?.menuName,
          "URL": formvalue?.url,
          "DisplayOrder": parseInt(formvalue?.order),
          "status": Number(formvalue?.status)
        }
        service = this.managementService.updateMenu(payload)
        message = 'Menu Updted Successfully'
        errorMessage = 'Menu Not Updted'
        this.button = 'Update'
      } else {
        payload = {
          "ModuleId": formvalue?.module ? parseInt(formvalue?.module) : 0,
          "MenuId": formvalue?.moduleSubMenu ? parseInt(formvalue?.moduleSubMenu) : 0,
          "Menu_Name": formvalue?.menuName,
          "URL": formvalue?.url,
          "DisplayOrder": parseInt(formvalue?.order),
          "status": Number(formvalue?.status)
        }
        service = this.managementService.addMenu(payload)
        message = 'Menu Added Successfully'
        errorMessage = 'Menu Not Added'
        this.button = 'Add'
      }
      service.subscribe((res: any) => {
        if (res?.status == 200) {
          this.notification.showSuccess(message)
          this.cancel();
          this.getMenuList()
        } else {
          this.notification.showError(errorMessage)
        }
      })
    } else {
      this.menuform.markAllAsTouched();
    }
  }

  onEdit(data: any) {
    this.button = 'Update'
    this.selectedMenuData = data;
    this.getMainmoudleList()
    this.selectedModule = this.mainModuleList?.find((val: any) => val?.value === this.selectedMenuData?.menuId);

    this.menuform = this.fb.group({
      module: [this.selectedModule],
      moduleSubMenu: [this.selectedSubmenu],
      menuName: [this.selectedMenuData?.subMenuName, [Validators.required]],
      url: [this.selectedMenuData?.url, [Validators.required, , Validators.pattern('.*\\.aspx$')]],
      order: [this.selectedMenuData?.displayOrder, [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: [this.selectedMenuData?.status, Validators.required]
    });
    this.menuform.get('module').patchValue(this.selectedMenuData?.menuId);
    this.menuform.get('moduleSubMenu').patchValue(this.selectedMenuData?.subMenuId);
    this.menuform.get('module')?.disable();
    this.menuform.get('moduleSubMenu')?.disable();
  }

  get isEditMode(): boolean {
    return !!this.selectedMenuData;
  }

  cancel() {
    this.getMainmoudleList()
    this.menuform.reset();
    this.selectedModule = null;
    this.selectedSubmenu = null
    this.menuform.get('status').patchValue('');
  }
}
