import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile-layout',
  templateUrl: './my-profile-layout.component.html',
  styleUrls: ['./my-profile-layout.component.scss']
})
export class MyProfileLayoutComponent {
  navigation: Array<any> = [
    {
      name: 'Company Details',
      path: 'company-details'
    },
    {
      name: 'Set Alert',
      path: 'set-alert'
    },
    {
      name: 'My User',
      path: 'my-user'
    },
    {
      name: 'Generate Token',
      path: 'generate-token'
    },
    {
      name: 'Bus list',
      path: 'Bus-list'
    },
    {
      name: 'Route List',
      path: 'route-list'
    },
    {
      name: 'Stop List',
      path: 'stop-list'
    },
    {
      name: 'All Notification',
      path: 'all-notification'
    }  
  ]
}
