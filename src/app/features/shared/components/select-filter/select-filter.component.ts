import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss']
})
export class SelectFilterComponent implements OnInit {
  @Input() vehicleData: any;
  @Input() placeholder: any
  @Input() type: any;
  @Input() id: any;
  @Input() selectedValue: any
  @Input() lat: any;
  @Input() long: any;
  @Input() disablerop:any;
  @Input() mulitiselection:boolean;
  @Input() closeDropdown:any;
  @Input() multiSelected:any
  @Output() onConfirm = new EventEmitter()

  vehicleListSetting!: IDropdownSettings;
  selectedVehicleItems: Array<any> = [];

  selectedVehicle: any = {
    id: '',
    assets_no: '',
    selectType: '',
    lat: '',
    long: ''
  };
  allSelectedVehicle:any;

  departmentList: any;
  disabledDropdown: boolean = false
  selectedfileter: boolean = false;
  ngOnInit(): void {        
    this.getDepartmentList();
    if (this.selectedValue) {
      this.selectedVehicleItems = [this.selectedValue];
    }

    if (!this.selectedValue?.value && !this.selectedValue?.text) {
      this.selectedVehicleItems = [];
    }
    this.disabledDropdown = this.disablerop
  }

  getDepartmentList() {
    setTimeout(() => {
      this.departmentList = this.vehicleData;

    }, 100)
    this.vehicleListListSetting();

  }


  ngOnChanges(changes: SimpleChanges) {
    this.getDepartmentList();
    if(this.multiSelected) {
      setTimeout(() => {     
        this.selectedVehicleItems = this.multiSelected;    
      }, 100);
    }

    if (this.selectedValue) {
      this.selectedfileter = true;
      this.selectedVehicleItems = [this.selectedValue];
    }
    if (!this.selectedValue?.value && !this.selectedValue?.text) {
      this.selectedVehicleItems = null; 
    }
  }


  /**
* vehicle list setting
*/
  vehicleListListSetting() {
    this.vehicleListSetting = {
      singleSelection: true,
      idField: 'value',
      textField: 'text',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
    if(this.mulitiselection && this.closeDropdown) {
      this.vehicleListSetting['singleSelection'] = false;
      this.vehicleListListSetting['closeDropDownOnSelection'] = false
    } 
  }

  onSelectVehicle(vehicle: any, type: any) {
    this.selectedVehicle = {
      id: vehicle.value,
      assets_no: vehicle.text,
      selectType: type,

    };
    this.onConfirm.emit(this.selectedVehicle);

  }

  /**
  * deselect vehicle list
  * @param vehicle 
  */
  onDeSelectVehicle(event:any,type: any) {
    this.selectedVehicle = {
      id: '',
      assets_no: '',
      selectType: type,
    }
    if(this.mulitiselection && this.closeDropdown) {
      this.selectedVehicle.id = event.value
    }

    
    this.onConfirm.emit(this.selectedVehicle);
  }

  onSelectAll(event:any,type: any) {    
    this.selectedVehicle = {
      data: event,
      selectType: type,
    }    
    this.onConfirm.emit(this.selectedVehicle);
  }

  onDeSelectAll(event:any,type: any) {    
    this.selectedVehicle = {
      data: null,
      selectType: type,
    }    
    this.onConfirm.emit(this.selectedVehicle);
  }
}
