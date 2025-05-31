import { Component, OnInit } from '@angular/core';

declare const google: any; // Declare Google Maps as an external library

@Component({
  selector: 'app-dummy-track',
  templateUrl: './dummy-track.component.html',
  styleUrls: ['./dummy-track.component.scss']
})
export class DummyTrackComponent {
  map: any;
  busMarker: any;
  busStops: any[]; // Replace with actual data from API response
  busCurrentPosition: { lat: number, lng: number };

  ngOnInit() {
    // Initialize the map
    this.initializeMap();

    // Fetch bus tracking data from API and update the map and timeline
    this.fetchBusTrackingData();
  }

  initializeMap() {
    // Replace with your preferred map initialization code (e.g., using Google Maps API)
    const mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 10
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  fetchBusTrackingData() {
    // Replace with your API call to retrieve bus tracking data
    // Update the 'busStops' array with the received data from the API response

    // Simulated example:
    this.busStops = [
      { stopId: 100232, stopName: 'Gondal Chowk', lat: 22.243767, lng: 70.798965, isActive: false },
      { stopId: 100233, stopName: 'Punit Nagar Society', lat: 22.247894, lng: 70.795006, isActive: false },
      { stopId: 100234, stopName: 'Goverdhan Chowk', lat: 22.251488, lng: 70.79068, isActive: false },
      // Add the remaining bus stops
      // ...
      { stopId: 100250, stopName: 'Madhapar Chowk', lat: 22.328545, lng: 70.76907, isActive: false }
    ];

    // Simulated bus tracking update (for demonstration purposes)
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.busStops.length);
      this.updateBusPosition(this.busStops[randomIndex]);
    }, 5000); // Update the bus position every 5 seconds (adjust as needed)
  }

  updateBusPosition(busStop: any) {
    // Clear the previous bus marker
    if (this.busMarker) {
      this.busMarker.setMap(null);
    }

    // Create a new bus marker
    this.busCurrentPosition = { lat: busStop.lat, lng: busStop.lng };
    this.busMarker = new google.maps.Marker({
      position: this.busCurrentPosition,
      map: this.map,
      title: busStop.stopName
    });

    // Update the active bus stop on the timeline
    this.busStops.forEach((stop) => {
      stop.isActive = (stop === busStop);
    });

    // Center the map on the bus marker
    this.map.setCenter(this.busCurrentPosition);
  }

  checkBusStopCovered(stop: any): boolean {
    // Check if the bus's latitude and longitude match the current bus stop
    if (this.busCurrentPosition && this.busCurrentPosition.lat === stop.lat && this.busCurrentPosition.lng === stop.lng) {
      return true;
    }
    return false;
  }
}
