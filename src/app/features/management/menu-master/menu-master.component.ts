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
  selectedMenuData:any;
  selectedModule :any
  mainModuleList: any;


  constructor(
    private managementService: ManagementService,
    private fb: FormBuilder,
    private notification : NotificationService
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
    })
  }

  confirm(event: any) {
    if (event.selectType == "Module") {
      this.selectModuleId = event?.id;
      this.getMenuList()
    } else if (event.selectType == "addModule") {
      this.menuform.get('module').patchValue(event.id);
    } else {
      this.menuList = [];
    }

  }

  getMenuList() {
    this.isloading = true;
    let payload = {
      "Module_ID": this.selectModuleId
    }
    this.page = 1
    this.managementService.menuList(payload).subscribe((res: any) => {
      this.isloading = false
      this.menuList = res?.body;
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
      let message = 'Menu Added Successfully';
      let errorMessage = 'Menu Not Added'
      let payload = {
        "Menu_ID": 0,
        "Module_ID": formvalue?.module ? parseInt(formvalue?.module) : 0,
        "Menu_Name": formvalue?.menuName,
        "Status": parseInt(formvalue?.status),
        "Url": formvalue?.url,
        "Display_Order": parseInt(formvalue?.order)
      }
      if(this.selectedMenuData?.menu_ID) {
        payload['Menu_ID'] = this.selectedMenuData?.menu_ID;
        message = 'Menu Updted Successfully'
        errorMessage = 'Menu Not Updted'
      };      
      this.managementService.addMenu(payload).subscribe((res:any) => {
        if(res?.status == 200) {
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

  onEdit(data:any) {
    this.getMainmoudleList()
    this.selectedMenuData = data;
    
    this.selectedModule = this.mainModuleList?.find((val: any) => val?.value === this.selectedMenuData?.module_ID);  

    this.menuform = this.fb.group({
      module: [this.selectedModule, [Validators.required]],
      menuName: [ this.selectedMenuData?.menu_Name, [Validators.required]],
      url: [this.selectedMenuData?.url, [Validators.required, , Validators.pattern('.*\\.aspx$')]],
      order: [this.selectedMenuData?.display_Order, [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: [this.selectedMenuData?.status, Validators.required]
    });
    this.menuform.get('module').patchValue(this.selectedMenuData?.module_ID);
  }

  cancel() {
    this.getMainmoudleList()
    this.menuform.reset();
    this.selectedModule = null;
    this.menuform.get('status').patchValue('');
  }
}
