import { Component, OnDestroy, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/core';
import { GeoOrderModel, IGeoOrderModel } from '../../../data/model/deliverer/GeoOrderModel';
import { DelivererService } from '../../../data/service/deliverer/deliverer.service';
import { DelivererPositionModel } from '../../../data/model/deliverer/DelivererPositionModel';
import { GAccount } from '../../../core/common/GAccount';
import { TakeOrderModel } from '../../../data/model/deliverer/TakeOrderModel';
import { SharedIonic } from '../../../core/common/SharedIonic';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Urls } from 'src/app/core/common/Urls';

@Component({
  selector: 'app-order-road-map',
  templateUrl: './order-road-map.component.html',
  styleUrls: ['./order-road-map.component.scss']
})
export class OrderRoadMapComponent implements OnInit, OnDestroy {

  order: IGeoOrderModel;
  geoWatchId: string;
  interval: any;
  map: any;
  delivererPosition = { lat: 0, lng: 0 };
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();

  constructor(
    private delivererService: DelivererService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.getLocation();
    }, 250);

    if (GAccount.OrderId == null || GAccount.OrderId === '0') {
      SharedIonic.toast(this.toastController, 'Failed');
      this.router.navigateByUrl(Urls.HomeUrl);
      return;
    }

    if (GAccount.OrderDeliver.orderId === '0' || GAccount.OrderDeliver == null) {
      SharedIonic.loading(this.loadingController);
      this.delivererService.GetOrderById(GAccount.OrderId).subscribe(
        res => {
          GAccount.OrderDeliver =
            new GeoOrderModel(
              res[0].id,
              GAccount.OrderId,
              +res[0].longitude,
              +res[0].latitude,
              res[0].customer_id,
              res[0].taken,
              null,
              null);

          this.order = GAccount.OrderDeliver;
          SharedIonic.dismissLoading(this.loadingController);
          setTimeout(() => {
            this.initMap();
            this.watchPosition();
          }, 500);
        },
        err => {
          SharedIonic.dismissLoading(this.loadingController);
          SharedIonic.toast(this.toastController, 'Failed');
          this.router.navigateByUrl(Urls.HomeUrl);
          return;
        }
      );
    } else {
      this.order = GAccount.OrderDeliver;
      setTimeout(() => {
        this.initMap();
        this.watchPosition();
      }, 500);
    }

    this.interval = setInterval(() => {
      this.delivererService.UpdatePosition(
        new DelivererPositionModel(GAccount.DelivererId, +this.delivererPosition.lng, +this.delivererPosition.lat))
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );

      // this.calcRoute();
    }, 3000);
  }

  ngOnDestroy(): void {

    this.clearWatch();
    clearInterval(this.interval);
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    console.log(position.coords);
    try {
      this.delivererPosition.lat = +position.coords.latitude;
      this.delivererPosition.lng = +position.coords.longitude;
    } catch {
      console.log('GeoLocation Failed');
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'main-alert',
      header: 'Notice',
      message: 'Are You Sure?',
      buttons: [
        'Cancel',
        {
          text: 'Deliver',
          handler: () => {
            this.onOrderDelivered();
          }
        }
      ]
    });

    await alert.present();
  }

  watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {

      if (err === undefined) {
        console.log(position);
        this.delivererPosition.lat = +position.coords.latitude;
        this.delivererPosition.lng = +position.coords.longitude;
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
    const POSITION = { lat: +this.order.latitude, lng: +this.order.longitude };
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      center: POSITION
    });

    this.directionsDisplay.setMap(this.map);

    this.calcRoute();

    // const orderMarker = new google.maps.Marker({
    //   position: POSITION,
    //   map: MAP
    // });
    // const delivererMarker = new google.maps.Marker({
    //   position: this.delivererPosition,
    //   map: MAP
    // });
  }

  calcRoute() {

    let request = {
      origin: this.delivererPosition,
      destination: { lat: +this.order.latitude, lng: +this.order.longitude },
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(result);
      }
    });
  }

  onOrderDelivered() {

    // SharedIonic.loading(this.loadingController);

    // this.delivererService.SetDone(GAccount.OrderId).subscribe(
    //   res => {
    //     console.log(res);
    //     SharedIonic.dismissLoading(this.loadingController);
    //     SharedIonic.toast(this.toastController, 'Successfully Done');
    //     this.router.navigateByUrl(Urls.HomeUrl);
    //   },
    //   err => {
    //     console.log(err);
    //     SharedIonic.dismissLoading(this.loadingController);
    //     SharedIonic.toast(this.toastController, 'Failed');
    //   }
    // );
  }
}
