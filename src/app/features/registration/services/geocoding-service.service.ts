import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeocodingServiceService {
  private apiKey = 'AIzaSyBcuET7Vey36x_ok8bidTwsiEWuOodEn8Y';
  private apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) {}

  geocode(address: string): Observable<any> {
    const url = `${this.apiUrl}?address=${encodeURIComponent(
      address
    )}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
