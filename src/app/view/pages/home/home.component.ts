import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { IGeoOrderModel, GeoOrderModel } from '../../../data/model/deliverer/GeoOrderModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  order: IGeoOrderModel = new GeoOrderModel('1', '1', 46.390, 38.0684094, null, null, null, null);
  geoWatchId: string;
  interval: any;
  delivererPosition = { lat: 38.0634094, lng: 46.393607700000004 };
  map: any;
  currentMapTrack = null;
  orderMarker: any;
  delivererMarker: any;

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.getLocation();
    this.watchPosition();
    this.initMap();

    // this.interval = setInterval(() => {
    //   this.delivererPosition.lat += 0.00005;
    //   this.delivererPosition.lng += 0.00005;
    //   // this.order.latitude += 0.00001;
    //   // this.order.longitude += 0.00001;
    //   this.calcRoute();
    //   // this.reDrawTrack();
    // }, 1000);
  }

  ngOnDestroy(): void {

    this.clearWatch();
    clearInterval(this.interval);
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    console.log(position.coords);
    try {
      this.delivererPosition.lat = position.coords.latitude;
      this.delivererPosition.lng = position.coords.longitude;
    } catch {
      console.log('GeoLocation Failed');
    }
  }

  watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {

      if (err === undefined) {
        console.log(position);
        this.delivererPosition.lat = position.coords.latitude;
        this.delivererPosition.lng = position.coords.longitude;
      } else {
        console.log(err);
      }
    });

    this.geoWatchId = wait;
  }

  clearWatch() {

    Geolocation.clearWatch({ id: this.geoWatchId });
    console.log('clearWatch');
  }

  initMap() {

    this.map = new google.maps.Map(document.getElementById('map'), {
      // zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      // mapTypeControl: false,
      // streetViewControl: false,
      // fullscreenControl: false,
      // center: this.delivererPosition
    });

    this.directionsDisplay.setMap(this.map);

    this.calcRoute();

    // google.maps.event.addListener(this.directionsDisplay, 'directions_changed', (directionsDisplay, i) => {

    //   console.log(directionsDisplay);
    //   console.log(i);
      
    //   let directions = directionsDisplay.getDirections();
    //   let new_start = directions.routes[0].legs[0].start_location;
    //   let new_end = directions.routes[0].legs[0].end_location;

    //   console.log(directions);
    //   console.log(new_start);
    //   console.log(new_end);
      
    // });

    // this.orderMarker = new google.maps.Marker({
    //   position: { lat: this.order.latitude, lng: this.order.longitude },
    //   animation: google.maps.Animation.BOUNCE,
    //   map: this.map
    // });

    // this.delivererMarker = new google.maps.Marker({
    //   position: this.delivererPosition,
    //   map: this.map
    // });

    // if (this.currentMapTrack) {
    //   this.currentMapTrack.setMap(null);
    // }

    // const markers = [this.orderMarker.position, this.delivererMarker.position];

    // if (markers.length > 1) {
    //   this.currentMapTrack = new google.maps.Polyline({
    //     path: markers,
    //     geodesic: true,
    //     strokeColor: '#77ab7e',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 3,
    //     map: this.map
    //   });
    //   // this.currentMapTrack.setMap(this.map);
    // }
  }

  calcRoute() {

    let request = {
      origin: this.delivererPosition,
      destination: { lat: this.order.latitude, lng: this.order.longitude },
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(result);
      }
    });
  }

  reDrawTrack() {

    this.orderMarker.setMap(null);
    this.delivererMarker.setMap(null);

    this.orderMarker = new google.maps.Marker({
      position: { lat: this.order.latitude, lng: this.order.longitude },
      animation: google.maps.Animation.BOUNCE,
      map: this.map
    });
    this.delivererMarker = new google.maps.Marker({
      position: this.delivererPosition,
      animation: google.maps.Animation.DROP,
      map: this.map
    });
    this.map.setCenter(this.delivererPosition);

    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }

    const markers = [this.orderMarker.position, this.delivererMarker.position];

    if (markers.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: markers,
        geodesic: true,
        strokeColor: '#77ab7e',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map: this.map
      });
      // this.currentMapTrack.setMap(this.map);
    }
  }
}
