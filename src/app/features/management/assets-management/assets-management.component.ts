import { Component } from '@angular/core';

@Component({
  selector: 'app-assets-management',
  templateUrl: './assets-management.component.html',
  styleUrls: ['./assets-management.component.scss']
})
export class AssetsManagementComponent {
  isloading:boolean = false;
  alertType: any = "success";
  alertTrigger: any = false;
  alertData: any = {
    message: "success",
  };
  
  constructor() { }

  ngOnInit() { }
}
