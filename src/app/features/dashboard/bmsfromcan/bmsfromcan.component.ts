import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-bmsfromcan',
  templateUrl: './bmsfromcan.component.html',
  styleUrls: ['./bmsfromcan.component.scss']
})
export class BmsfromcanComponent {
  @Input() mapList:any;
  @Input() page:any;
  tableData:any;
  vehiclelistData = {
    trackList: [],
    isloading: false,
    page: 1,
    count: 0,
    tableSize: 200,
    location: [
      {
        latitude: 0,
        longitude: 0,
        place: '',
        vehicle: '',
        Time: '',
        last_GPS: '',
        Speed: '',
      }
    ]
  };
  subHeaders: any;

  constructor(
    private sanitizer: DomSanitizer
  ){}

  ngOnInit() {
    this.setInitialValue();
    if(this.mapList) {
      this.vehiclelistData.count = this.mapList?.length
    }
  }
  setInitialValue() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO', rowspan: 2 },
      { key: 'keyValue', val: 'Vehicle No.', rowspan: 2 },
      { key: 'keyValue', val: 'SOC', rowspan: 2 },
      { key: 'keyValue', val: 'Total Voltage (V)', rowspan: 2 },
      { key: 'keyValue', val: 'Total Current (A)', rowspan: 2 },
      { key: 'keyValue', val: 'Max Battery Temp. (°C)', rowspan: 2 },
      { key: 'keyValue', val: 'Max Battery Voltage (V)', rowspan: 2 },
      { key: 'keyValue', val: 'Min Battery Temp (°C)', rowspan: 2 },
      { key: 'keyValue', val: 'Min Battery Voltage (V)', rowspan: 2 },
      { key: 'keyValue', val: 'Battery Failure Level', rowspan: 2 },
      { key: 'keyValue', val: 'Battery Temperature (°C)', colspan: 8 },
      { key: 'keyValue', val: 'Battery Cell Voltage (V)', colspan: 4 },
    ];

    this.subHeaders = [
        { val: '1' },
        { val: '2' },
        { val: '3' },
        { val: '4' },
        { val: '5' },
        { val: '6' },
        { val: '7' },
        { val: '8' },
        { val: '1' },
        { val: '2' },
        { val: '3' },
        { val: '4' },
      
    ]
  }

  hasSubColumns: boolean = false;
  
  checkForSubColumns() {
    this.hasSubColumns = this.tableData.some(h => h.subColumns);
  }

  onTableDataChange(event: any) {
    this.vehiclelistData.page = event;
  };

  getBatteryIcon(battery: any): SafeHtml {
    let iconHtml = '';
    
    if (battery >= 75) {
      iconHtml = `<i class="fa fa-thermometer-full" aria-hidden="true" style="color: red !important; font-size: 18px !important;"></i> ${battery}%`;
    } else if (battery >= 60 && battery < 75) {
      iconHtml = `<i class="fa fa-thermometer-three-quarters" aria-hidden="true" style="color: orange !important; font-size: 18px !important;"></i> ${battery}%`;
    } else if (battery >= 45 && battery < 60) {
      iconHtml = `<i class="fa fa-thermometer-half" aria-hidden="true" style="color: yellow !important; font-size: 18px !important;"></i> ${battery}%`;
    } else if (battery >= 20 && battery < 45) {
      iconHtml = `<i class="fa fa-thermometer-quarter" aria-hidden="true" style="color: blue !important; font-size: 18px !important;"></i> ${battery}%`;
    } else {
      iconHtml = `<i class="fa fa-thermometer-empty" aria-hidden="true" style="color: green !important; font-size: 18px !important;"></i> ${battery}%`;
    }
    
    return this.sanitizer.bypassSecurityTrustHtml(iconHtml);
  }


  getSocIcon(battery: any): SafeHtml {
    let iconHtml = '';
  
    if (battery >= 75) {
      iconHtml = `<img src="assets/charging/100.png" alt="Battery 100%" style="width:30px; height:15px;"/>  ${battery}%`;
    } else if (battery >= 60 && battery < 75) {
      iconHtml = `<img src="assets/charging/75.png" alt="Battery 75%" style="width:30px; height:15px;"/>  ${battery}%`;
    } else if (battery >= 45 && battery < 60) {
      iconHtml = `<img src="assets/charging/60.png" alt="Battery 60%" style="width:30px; height:15px;"/>  ${battery}% `;
    } else if (battery >= 20 && battery < 45) {
      iconHtml = `<img src="assets/charging/30.png" alt="Battery 30%" style="width:30px; height:15px;"/>  ${battery}%`;
    } else {
      iconHtml = `<img src="assets/charging/10.png" alt="Battery 10%" style="width:30px; height:15px;"/>  ${battery}%`;
    }
  
    return this.sanitizer.bypassSecurityTrustHtml(iconHtml);
  }

  getBatteryVoltage(battery: any): SafeHtml {
    let iconHtml = '';

    if (battery >= 10) {
      iconHtml = `<img src="assets/charging/100.png" alt="Battery 100%" style="width:30px; height:15px;"/>  ${battery}%`;
    } else if (battery >= 5 && battery < 10) {
      iconHtml = `<img src="assets/charging/60.png" alt="Battery 60%" style="width:30px; height:15px;"/>  ${battery}% `;
    } else if (battery >= 0 && battery < 5) {
      iconHtml = `<img src="assets/charging/10.png" alt="Battery 10%" style="width:30px; height:15px;"/>  ${battery}%`;
    }

    return this.sanitizer.bypassSecurityTrustHtml(iconHtml);
  }
  
  
  
}
