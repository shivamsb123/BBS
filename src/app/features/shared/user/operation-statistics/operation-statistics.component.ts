import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-operation-statistics',
  templateUrl: './operation-statistics.component.html',
  styleUrls: ['./operation-statistics.component.scss']
})
export class OperationStatisticsComponent {
  opertionStatList :any;
  tableData :any;
  isLoading = false;

  constructor(
    private userService: UserService,
  ){}

  ngOnInit() {
    this.setInitialTable();
    this.getOpretionStatList();
  }

  setInitialTable () {
    this.tableData = [
      { key: 'keyValue', val: 'Total saved fuel (In Litres)'},
      { key: 'keyValue', val: 'Fuel saving per day (In Litres)'},
      { key: 'keyValue', val: 'GHG emission reduction (CO2e per day in Kg.)'},
      { key: 'keyValue', val: 'Total GHG emission reduction (CO2e in Kg.)'},
      { key: 'keyValue', val: 'Total Run Km'},
    ];
  }

  getOpretionStatList() {
    this.isLoading = true;
    this.userService.operationStat().subscribe((res:any) => { 
      this.isLoading = false;
      this.opertionStatList = res?.body?.data || {};
    })
  }

}
