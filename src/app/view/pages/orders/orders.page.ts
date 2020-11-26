import { Component, OnInit, OnDestroy } from '@angular/core';
import { DelivererService } from '../../../data/service/deliverer/deliverer.service';
import { GeoLocationModel } from '../../../data/model/deliverer/GeoLocationModel';
import { IGeoOrderModel, GeoOrderModel } from '../../../data/model/deliverer/GeoOrderModel';
import { IonRouterOutlet, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { GeoLocationModalComponent } from './GeoLocationModal/GeoLocationModal.component';
import { GAccount } from '../../../core/common/GAccount';
import { SharedIonic } from '../../../core/common/SharedIonic';
import { Router } from '@angular/router';
import { Urls } from 'src/app/core/common/Urls';
import { TakeOrderModel } from '../../../data/model/deliverer/TakeOrderModel';
import { IOrderDetails, OrderDetails } from '../../../data/model/deliverer/OrderDetails';
import { Geolocation } from '@capacitor/core';
import { G } from '../../../core/common/G';
import { OrderDetailsModalComponent } from './order-details-modal/order-details-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.page.html',
  styleUrls: ['orders.page.scss']
})
export class OrdersPage implements OnInit, OnDestroy {

  orders: IGeoOrderModel[] = [];
  sortedOrders: IGeoOrderModel[] = [];

  selectedOrder: IGeoOrderModel;
  selectedOrderDetails: IOrderDetails[] = [];
  selectedMode = false;
  geoWatchId: string;
  delivererPosition = { lat: 0, lng: 0 };
  interval: any;
  isPageDestroyed = true;

  constructor(
    private delivererService: DelivererService,
    public modalCtrl: ModalController,
    public routerOutlet: IonRouterOutlet,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router) {

    console.log('constructor');
  }

  ngOnInit(): void {

    console.log('ngOnInit');
    // if (GAccount.IsLoggedIn() && this.isSignupConfirm() && this.isPageDestroyed) {

    //   this.getLocation();
    //   this.watchPosition();
    // }
  }

  isLoggedIn() {
    return GAccount.IsLoggedIn();
  }

  isSignupConfirm() {
    return GAccount.SignupStatus;
  }

  doRefresh(event) {

    setTimeout(() => {
      if (GAccount.IsLoggedIn() && this.isSignupConfirm()) {
        this.GetOrderByDistance();
      }
      event.target.complete();
    }, 500);
  }

  GetOrderByDistanceInterval() {

    this.delivererService.GetOrderByDistance(new GeoLocationModel(this.delivererPosition.lng, this.delivererPosition.lat)).subscribe(

      res => {
        console.log('res');
        console.log(res);
        this.orders = [];
        res.forEach(r => {
          this.orders.push(
            new GeoOrderModel(
              r.id,
              r.orderId,
              r.longitude,
              r.latitude,
              r.custid,
              r.taken,
              r.paid,
              null
            ));
        });

        console.log(this.orders);
        if (this.orders.length > 0) {
          this.sortByDistance();
        }
      },
      err => {
        console.log('err');
        console.log(err);
      }
    );
  }

  GetOrderByDistance() {

    SharedIonic.loading(this.loadingController);

    this.delivererService.GetOrderByDistance(new GeoLocationModel(this.delivererPosition.lng, this.delivererPosition.lat)).subscribe(

      res => {
        console.log('res');
        console.log(res);
        this.orders = [];
        res.forEach(r => {
          this.orders.push(
            new GeoOrderModel(
              r.id,
              r.orderId,
              r.longitude,
              r.latitude,
              r.custid,
              r.taken,
              r.paid,
              null
            ));
        });

        console.log(this.orders);
        if (this.orders.length > 0) {
          this.sortByDistance();
        }
        SharedIonic.dismissLoading(this.loadingController);
      },
      err => {
        console.log('err');
        console.log(err);
        SharedIonic.dismissLoading(this.loadingController);
      }
    );
  }

  ionViewWillEnter() {

    console.log('ionViewWillEnter');

    if (GAccount.IsLoggedIn() && this.isSignupConfirm()) {

      setTimeout(() => {
        this.getLocation();
        this.watchPosition();
      }, 500);
    }
  }

  ionViewWillLeave() {

    console.log('ionViewWillLeave');
    this.clearWatch();
    clearInterval(this.interval);
    // this.isPageDestroyed = false;
  }

  ngOnDestroy(): void {

    console.log('ngOnDestroy');
    this.clearWatch();
    clearInterval(this.interval);
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    console.log(position.coords);
    try {
      this.delivererPosition.lat = position.coords.latitude;
      this.delivererPosition.lng = position.coords.longitude;
      this.GetOrderByDistance();
      this.interval = setInterval(() => {
        if (!this.selectedMode) {
          this.GetOrderByDistanceInterval();
        }
      }, 10000);
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

  async presentMap(model) {
    const modal = await this.modalCtrl.create({
      component: GeoLocationModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { order: model }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      if (GAccount.IsDelivererTakeOrderState()) {
        SharedIonic.toast(this.toastController, 'Already Have One Order');
        return;
      }
      SharedIonic.loading(this.loadingController);
      const order: IGeoOrderModel = data;

      this.delivererService.GetStockbyDelivererId(GAccount.DelivererId.toString()).subscribe(
        res => {
          console.log(res);
          let found = false;
          res.forEach(myProduct => {
            this.selectedOrderDetails.forEach(orderProduct => {
              if (orderProduct.product_id.toString() === myProduct.product_id.toString()) {
                if (myProduct.quantity < orderProduct.quantity) {
                  SharedIonic.toast(this.toastController, myProduct.name + ' quantity is not enough');
                  found = true;
                  return;
                }
              }
            });
          });
          if (!found) {
            this.delivererService.TakeOrder(new TakeOrderModel(GAccount.DelivererId, order.orderId)).subscribe(
              res => {
                console.log('res');
                console.log(res);
                SharedIonic.dismissLoading(this.loadingController);
                GAccount.DelivererTakeOrderState = true;
                GAccount.OrderId = order.orderId;
                GAccount.OrderDeliver = order;
                localStorage.setItem('isDelivererTakeOrderState', '1');
                localStorage.setItem('orderId', order.orderId);
                SharedIonic.toast(this.toastController, 'Order Taked');
                this.router.navigateByUrl(Urls.OrderRoadMapUrl);
              },
              err => {
                console.log('err');
                console.log(err);
                if (err.error.text === 'Commande prise !') {
                  GAccount.DelivererTakeOrderState = true;
                  GAccount.OrderId = this.selectedOrder.orderId;
                  GAccount.OrderDeliver = this.selectedOrder;
                  localStorage.setItem('isDelivererTakeOrderState', '1');
                  localStorage.setItem('orderId', this.selectedOrder.orderId);
                  SharedIonic.toast(this.toastController, 'Order Taked');
                  this.router.navigateByUrl(Urls.OrderRoadMapUrl);
                } else {
                  SharedIonic.toast(this.toastController, 'Failed!');
                  this.GetOrderByDistance();
                }
                SharedIonic.dismissLoading(this.loadingController);
              }
            );
          }
        },
        err => {
          console.log(err);
          SharedIonic.dismissLoading(this.loadingController);
        });
      ////////////////////////////
      // SharedIonic.dismissLoading(this.loadingController);
      // GAccount.DelivererTakeOrderState = true;
      // GAccount.OrderId = order.id;
      // GAccount.OrderDeliver = order;
      // localStorage.setItem('isDelivererTakeOrderState', '1');
      // localStorage.setItem('orderId', order.id);
      // SharedIonic.toast(this.toastController, 'Order Taked');
      // this.router.navigateByUrl(Urls.OrderRoadMapUrl);
    }
  }

  async presentOrderDetail(model) {
    const modal = await this.modalCtrl.create({
      component: OrderDetailsModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { order: model }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
  }

  onOrderDetails(index: number | string) {

    // if (this.selectedOrderDetails == null || this.selectedOrderDetails.length < 1) {
    //   return;
    // }
    // if (this.selectedOrderDetails[index] == null) {
    //   return;
    // }
    // this.presentOrderDetail(this.selectedOrderDetails[index]);
  }

  onOrder(id: string) {

    if (this.sortedOrders == null || this.sortedOrders.length < 1) {
      return;
    }
    let order = this.sortedOrders.find(x => x.orderId === id);

    if (order == null) {
      return;
    }

    SharedIonic.loading(this.loadingController);

    this.selectedOrder =
      new GeoOrderModel(order.id, order.orderId, order.longitude, order.latitude, order.custid, order.taken, order.paid, order.distance);

    this.delivererService.GetOrderById(this.selectedOrder.orderId).subscribe(
      res => {
        console.log('res-GetOrderById');
        console.log(res);
        this.selectedOrderDetails = res;
        if (this.selectedOrderDetails.length < 1 || this.selectedOrderDetails == null) {
          this.selectedMode = false;
          SharedIonic.toast(this.toastController, 'Failed!');
        } else if (this.selectedOrderDetails[0].latitude == null || this.selectedOrderDetails[0].longitude == null) {
          this.selectedMode = false;
          SharedIonic.toast(this.toastController, 'Failed!');
        } else {
          this.selectedMode = true;
        }
        SharedIonic.dismissLoading(this.loadingController);
      },
      err => {
        console.log('err-GetOrderById');
        console.log(err);
        this.selectedMode = false;
        SharedIonic.dismissLoading(this.loadingController);
        SharedIonic.toast(this.toastController, 'Failed!');
      }
    );
  }

  sortByDistance() {

    this.sortedOrders = [];

    this.orders.forEach(order => {

      this.sortedOrders.push(
        new GeoOrderModel(
          order.id,
          order.orderId,
          order.longitude,
          order.latitude,
          order.custid,
          order.taken,
          order.paid,
          G.getDistanceFromLatLonInKm(this.delivererPosition.lat, this.delivererPosition.lng, order.latitude, order.longitude))
      );
    });
    console.log(...this.sortedOrders);

    this.sortedOrders.sort((a, b) => {
      return a.distance - b.distance;
    });

    console.log(...this.sortedOrders);

    this.sortedOrders.forEach(order => {
      order.distance = +(Math.round(+order.distance * 100) / 100).toFixed(2);
    });
  }

  onBack() {
    this.selectedMode = false;
  }

  onShowMap() {
    this.presentMap(this.selectedOrder);
  }

  onTakeOrder() {
    if (GAccount.IsDelivererTakeOrderState()) {
      SharedIonic.toast(this.toastController, 'Already Have One Order');
      return;
    }

    SharedIonic.loading(this.loadingController);

    this.delivererService.GetStockbyDelivererId(GAccount.DelivererId.toString()).subscribe(
      res => {
        console.log(res);
        let found = false;
        res.forEach(myProduct => {
          this.selectedOrderDetails.forEach(orderProduct => {
            if (orderProduct.product_id.toString() === myProduct.product_id.toString()) {
              if (myProduct.quantity < orderProduct.quantity) {
                SharedIonic.toast(this.toastController, myProduct.name + ' quantity is not enough');
                found = true;
                return;
              }
            }
          });
        });
        if (!found) {
          this.delivererService.TakeOrder(new TakeOrderModel(GAccount.DelivererId, this.selectedOrder.orderId)).subscribe(
            res => {
              console.log('res');
              console.log(res);
              SharedIonic.dismissLoading(this.loadingController);
              GAccount.DelivererTakeOrderState = true;
              GAccount.OrderId = this.selectedOrder.orderId;
              GAccount.OrderDeliver = this.selectedOrder;
              localStorage.setItem('isDelivererTakeOrderState', '1');
              localStorage.setItem('orderId', this.selectedOrder.orderId);
              SharedIonic.toast(this.toastController, 'Order Taked');
              this.router.navigateByUrl(Urls.OrderRoadMapUrl);
            },
            err => {
              console.log('err');
              console.log(err);
              if (err.error.text === 'Commande prise !') {
                GAccount.DelivererTakeOrderState = true;
                GAccount.OrderId = this.selectedOrder.orderId;
                GAccount.OrderDeliver = this.selectedOrder;
                localStorage.setItem('isDelivererTakeOrderState', '1');
                localStorage.setItem('orderId', this.selectedOrder.orderId);
                SharedIonic.toast(this.toastController, 'Order Taked');
                this.router.navigateByUrl(Urls.OrderRoadMapUrl);
              } else {
                SharedIonic.toast(this.toastController, 'Failed!');
                this.GetOrderByDistance();
              }
              SharedIonic.dismissLoading(this.loadingController);
            }
          );
        }
      },
      err => {
        console.log(err);
        SharedIonic.dismissLoading(this.loadingController);
      }
    );
    ////////////////////////////
    // SharedIonic.dismissLoading(this.loadingController);
    // GAccount.DelivererTakeOrderState = true;
    // GAccount.OrderId = this.selectedOrder.id;
    // GAccount.OrderDeliver = this.selectedOrder;
    // localStorage.setItem('isDelivererTakeOrderState', '1');
    // localStorage.setItem('orderId', this.selectedOrder.id);
    // SharedIonic.toast(this.toastController, 'Order Taked');
    // this.router.navigateByUrl(Urls.OrderRoadMapUrl);
  }
}
