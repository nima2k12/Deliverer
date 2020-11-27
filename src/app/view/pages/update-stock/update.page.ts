import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { GAccount } from '../../../core/common/GAccount';
import { StockService } from '../../../data/service/deliverer/stock.service';
import { SharedIonic } from '../../../core/common/SharedIonic';
import { IDelivererStockModel } from '../../../data/model/deliverer/DelivererStockModel';
import { G } from '../../../core/common/G';

@Component({
  selector: 'app-update',
  templateUrl: 'update.page.html',
  styleUrls: ['update.page.scss']
})
export class UpdatePage implements OnInit {

  products: IDelivererStockModel[];
  isOnInitHappen = false;

  constructor(
    private stockService: StockService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router) { }

  ngOnInit(): void {

    if (GAccount.IsLoggedIn() && this.isSignupConfirm()) {

      this.getProducts();
      this.isOnInitHappen = true;
    }
  }

  ionViewWillEnter() {

    if (GAccount.IsLoggedIn() && this.isSignupConfirm() && !this.isOnInitHappen) {

      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < G.deliveredProducts.length; index++) {
        if (G.deliveredProducts[index].isDelivered) {
          // tslint:disable-next-line: prefer-for-of
          for (let index = 0; index < this.products.length; index++) {
            if (this.products[index].product_id === G.deliveredProducts[index].productId) {
              this.products[index].quantity -= G.deliveredProducts[index].productCount;
              G.deliveredProducts[index].productCount = 0;
            }
          }
        }
      }
    }
    this.isOnInitHappen = false;
  }

  getProducts() {

    SharedIonic.loading(this.loadingController);

    this.stockService.GetStockbyDelivererId(GAccount.DelivererId.toString()).subscribe(
      res => {
        this.products = res;
        SharedIonic.dismissLoading(this.loadingController);
      },
      err => {
        SharedIonic.dismissLoading(this.loadingController);
      }
    );
  }

  doRefresh(event) {

    setTimeout(() => {
      if (GAccount.IsLoggedIn() && this.isSignupConfirm()) {
        this.getProducts();
      }
      event.target.complete();
    }, 500);
  }

  onPay() {
    this.router.navigateByUrl('/Payment');
  }

  isLoggedIn() {
    return GAccount.IsLoggedIn();
  }

  isSignupConfirm() {
    return GAccount.SignupStatus;
  }
}
