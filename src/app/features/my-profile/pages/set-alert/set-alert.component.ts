import { Component } from '@angular/core';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { StorageService } from 'src/app/features/http-services/storage.service';

@Component({
  selector: 'app-set-alert',
  templateUrl: './set-alert.component.html',
  styleUrls: ['./set-alert.component.scss']
})
export class SetAlertComponent {
  alertTime: any
  alertData: any;
  intervalId: any;
  selectedLanguage = 'HI';
  newAlertTime: any;
  isNotification: boolean = true;
  notificationValue: any;
  notificationData = "On"
  constructor(
    private storageService: StorageService,
    private NotificationService: NotificationService
  ) { }

  ngOnInit() {
    this.storageService.getItem('notification').subscribe((res: any) => {
      this.notificationValue = res;
      console.log("check ", this.notificationValue);
  
      if (this.notificationValue !== undefined && this.notificationValue !== null) {
        this.isNotification = this.notificationValue;
      } else {
        // If notificationValue is undefined or null, set isNotification to true
        this.isNotification = true;
        this.storageService.setItem('notification', this.isNotification);
      }
  
      this.notificationData = this.isNotification ? "On" : "Off";
    });
  
    setTimeout(() => {
      console.log("check notification", this.isNotification);
    }, 600);
  }

  onLanguageChange(event: any) {
    this.selectedLanguage = event.target.value
  }

  submit() {
    if (!(this.alertTime && this.selectedLanguage)) {
      this.NotificationService.showInfo(
        "Please Enter Minute and Language For Alert"
      );
      return
    }
    this.storageService.setItem('language', this.selectedLanguage);
    this.storageService.setItem('alert', this.alertTime);
    this.NotificationService.showInfo(
      "You will Get Alert in Every" + " " + this.alertTime + " " + "Minutes" + " in " + this.selectedLanguage
    );
    this.alertTime = '';
  }

  onChangeNotification() {
    this.isNotification != this.isNotification;
    if (this.isNotification) {
      this.notificationData = "On"
    } else {
      this.notificationData = "Off"
    }
    this.NotificationService.showInfo(
      `Notification ${this.notificationData}`
    );
    this.storageService.setItem('notification', this.isNotification);
  }

}
