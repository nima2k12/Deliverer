import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeoOrderModel, IGeoOrderModel } from '../../../data/model/deliverer/GeoOrderModel';
import { DelivererService } from '../../../data/service/deliverer/deliverer.service';
import { DelivererPositionModel } from '../../../data/model/deliverer/DelivererPositionModel';
import { GAccount } from '../../../core/common/GAccount';
import { SharedIonic } from '../../../core/common/SharedIonic';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Urls } from 'src/app/core/common/Urls';
import { G } from '../../../core/common/G';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-order-road-map',
  templateUrl: './order-road-map.component.html',
  styleUrls: ['./order-road-map.component.scss']
})
export class OrderRoadMapComponent implements OnInit, OnDestroy {

  order: IGeoOrderModel;
  isAutoRoadTrack = true;
  geoWatchId: string;
  interval: any;
  map: any;
  delivererPosition = { lat: 0, lng: 0 };
  lastDelivererPosition = { lat: 0, lng: 0 };
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

      if (this.isAutoRoadTrack) {

        let distance =
          G.getDistanceFromLatLonInKm
            (this.lastDelivererPosition.lat, this.lastDelivererPosition.lng, this.delivererPosition.lat, this.delivererPosition.lng);

        if (distance > 500) {
          this.lastDelivererPosition = this.delivererPosition;
          this.calcRoute();
        }
      }

    }, 3000);
  }

  ionViewWillLeave() {

    this.clearWatch();
    clearInterval(this.interval);
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
      this.lastDelivererPosition.lat = +position.coords.latitude;
      this.lastDelivererPosition.lng = +position.coords.longitude;
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
      center: this.delivererPosition
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
      origin: this.lastDelivererPosition,
      destination: { lat: +this.order.latitude, lng: +this.order.longitude },
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(result);
        setTimeout(() => {
          this.map.setCenter(this.lastDelivererPosition);
          this.map.setZoom(15);
        }, 500);
      }
    });
  }

  onOrderDelivered() {

    let distance =
      G.getDistanceFromLatLonInKm
        (this.delivererPosition.lat, this.delivererPosition.lng, this.order.latitude, this.order.longitude);

    if (distance > 500) {
      SharedIonic.toast(this.toastController, 'You Are Far From Order!');
      return;
    }

    SharedIonic.loading(this.loadingController);

    this.delivererService.SetDone(GAccount.OrderId).subscribe(
      res => {
        console.log('res');
        console.log(res);
        SharedIonic.dismissLoading(this.loadingController);
        SharedIonic.toast(this.toastController, 'Successfully Done');
        for (let index = 0; index < localStorage.length; index++) {

          if (localStorage.key(index) === 'isDelivererTakeOrderState') {
            localStorage.removeItem('isDelivererTakeOrderState');
          } else if (localStorage.key(index) === 'orderId') {
            localStorage.removeItem('orderId');
          }
        }
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < G.deliveredProducts.length; index++) {

          if (G.deliveredProducts[index].orderId === GAccount.OrderId) {
            G.deliveredProducts[index].isDelivered = true;
          }
        }
        GAccount.DelivererTakeOrderState = false;
        GAccount.OrderId = '0';
        this.router.navigateByUrl(Urls.OrdersUrl);
      },
      err => {
        console.log('err');
        console.log(err);
        SharedIonic.dismissLoading(this.loadingController);
        if (err.error.text === 'Done !') {
          SharedIonic.toast(this.toastController, 'Successfully Done');
          for (let index = 0; index < localStorage.length; index++) {

            if (localStorage.key(index) === 'isDelivererTakeOrderState') {
              localStorage.removeItem('isDelivererTakeOrderState');
            } else if (localStorage.key(index) === 'orderId') {
              localStorage.removeItem('orderId');
            }
          }
          // tslint:disable-next-line: prefer-for-of
          for (let index = 0; index < G.deliveredProducts.length; index++) {

            if (G.deliveredProducts[index].orderId === GAccount.OrderId) {
              G.deliveredProducts[index].isDelivered = true;
            }
          }
          GAccount.DelivererTakeOrderState = false;
          GAccount.OrderId = '0';
          this.router.navigateByUrl(Urls.OrdersUrl);
        } else {
          SharedIonic.toast(this.toastController, 'Failed');
        }
      }
    );
  }
}
