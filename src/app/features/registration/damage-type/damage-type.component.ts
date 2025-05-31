import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-damage-type',
  templateUrl: './damage-type.component.html',
  styleUrls: ['./damage-type.component.scss']
})
export class DamageTypeComponent implements OnInit{
  damageTypeList: any;
  tableData:any;
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [6, 9, 12];
  addDamage!: FormGroup
  isloading = false;
  button = 'Save';
  mode = 0

  constructor( 
    private ragistrationService: RegistrationService,
    private fb : FormBuilder
  ) {}

  ngOnInit(): void {
    this.getDamageList(0);
    this.setInitialValue()
    this.setInitialTable();
  }

  setInitialValue() {
   this.addDamage = this.fb.group({
    company: ['', [ Validators.required, Validators.pattern('')]],
    status: ['', [ Validators.required, Validators.pattern('')]]
   })
  }

  setInitialTable() {
    this.tableData = [
      {key : '', value: 'Damage Name'},
      {key : '', value: 'Status'},
      {key : '', value: 'Action'},
    ]
  }

  getDamageList (id:any) {
    this.isloading = true;
    let payload = {
      "PageNo":1,
      "PageSize":100,
      "D_ID": id,
    }

    this.ragistrationService.damageList(payload).subscribe((res:any) => {
      this.damageTypeList = res?.body?.data;
      this.isloading = false;

      if(id !== 0) {
        this.damageTypeList.forEach((val:any) => {
          this.addDamage = this.fb.group({
            company: [val?.damagE_NAME, [ Validators.required, Validators.pattern('')]],
            status: [val?.statuS_REMARK == 'De-Active' ? 2 : 1, [ Validators.required, Validators.pattern('')]]
           })
        })
      }
    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any){
    this.page = event;
  }

  update(id:any) {
    this.button = "Update";
    this.mode = 1,
    this.getDamageList(id);
    
  }

  submit(formvalue:any) {
    let payload = {
      "DAMAGE_NAME":formvalue.company,
      "Mode":this.mode,
      "CREATED_BY":1,
      "RESULT":"",
      "STATUS": parseInt(formvalue.status || '')
      
    }

    this.ragistrationService.AddDamageType(payload).subscribe((res:any) => {      
      if(res?.body?.status == 'Success') {        
        this.getDamageList(0);
        this.addDamage.reset()  
        this.button = "Save";   
      }
    })
  }

  cancel() {
    this.addDamage.reset();
    this.getDamageList(0)
  }


}
