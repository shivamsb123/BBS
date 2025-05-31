import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from 'src/app/features/http-services/api.service';
import { API_CONSTANTS } from '../../shared/constant/API_CONSTANT';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from './dashboard.service';
@Injectable({
  providedIn: 'root'
})
export class BusService {
  mapList: any;
  vehiclelistData: any;

  constructor(private apiService: ApiService,
    private dashboardService: DashboardService) { }
  id: number = 0;
  // getdata( ) : Observable{
  //   this.vehiclelistData.isloading =  true;
   
  //   this.dashboardService.mapview1(payload).subscribe((res: any) => {
  //     this.mapList = res?.body?.data?.list_map_view
  //     this.vehiclelistData.trackList = res?.body?.data?.list_track_sta;
  //     console.log('map view =========>', res?.body?.data?.list_map_view);
  //   });
  // }
}
