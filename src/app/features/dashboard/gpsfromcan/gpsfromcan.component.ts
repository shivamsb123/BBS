import { Component, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LocationTrackPopupComponent } from '../../reports/location-track-popup/location-track-popup.component';
import { catchError, map, Observable, of } from 'rxjs';
import { SharedService } from '../../http-services/shared.service';
@Component({
  selector: 'gpsfromcan',
  templateUrl: './gpsfromcan.component.html',
  styleUrls: ['./gpsfromcan.component.scss']
})
export class GpsfromcanComponent {
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
    private sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private sharedService: SharedService
  ){}

  ngOnInit() {
    this.setInitialValue()
  }

  ngOnChanges(changes: SimpleChanges): void {   
  }
  setInitialValue() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO', rowspan: 2 },
      { key: 'keyValue', val: 'Vehicle No.', rowspan: 2 },
      { key: 'keyValue', val: 'Last Update', rowspan: 2 },
      { key: 'keyValue', val: 'Speed', rowspan: 2 },
      {key: 'keyValue', val: 'Odometer',  rowspan: 2},
      { key: 'keyValue', val: 'Location', rowspan: 2 },
    ];

  }

  hasSubColumns: boolean = false;
  
  checkForSubColumns() {
    this.hasSubColumns = this.tableData.some(h => h.subColumns);
  }

  onTableDataChange(event: any) {
    this.vehiclelistData.page = event;
  };

  getAddress(lat: number, lon: number): Observable<string> {
    const coordinates = { lat, lng: lon };
    return this.sharedService.getAddress(coordinates).pipe(
      map((res: any) =>  res?.Result?.add || 'Unknown location'),
      catchError(() => of('Error fetching location'))
    );
  }

  bsModalRef!: BsModalRef
  openModal(data: any) {
    this.getAddress(data?.lat, data?.lon).subscribe((location: string) => {  
      const initialState: ModalOptions = {
        initialState: {
          data: {
            ...data,
            place: location 
          },
        },
      };
  
      this.bsModalRef = this.modalService.show(
        LocationTrackPopupComponent,
        Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
      );
    });
  }
  
}


