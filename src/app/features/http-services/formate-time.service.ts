import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormateTimeService {

  constructor() { }

  formatFromDate(myDate: any) {
    myDate.setHours(0, 0, 0, 0);
    return myDate

  }

  formatToDate(myDate: any) {
    if (!(myDate instanceof Date)) {
      myDate = new Date(myDate);
    }

    // Set hours to 23, minutes to 59, seconds to 0, and milliseconds to 0
    myDate.setHours(23, 59, 0, 0);

    // Check if the time should be adjusted for the previous date
    const currentDate = new Date();
    const currentDateWithoutTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (myDate.getTime() < currentDateWithoutTime.getTime()) {
      myDate.setDate(myDate.getDate() + 1);
    }

    return myDate;
  }
}
