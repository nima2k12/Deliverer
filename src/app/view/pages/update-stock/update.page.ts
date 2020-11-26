import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { GAccount } from '../../../core/common/GAccount';
import { StockService } from '../../../data/service/deliverer/stock.service';
import { SharedIonic } from '../../../core/common/SharedIonic';
import { IDelivererStockModel } from '../../../data/model/deliverer/DelivererStockModel';

@Component({
  selector: 'app-update',
  templateUrl: 'update.page.html',
  styleUrls: ['update.page.scss']
})
export class UpdatePage implements OnInit {

  products: IDelivererStockModel[];

  constructor(
    private stockService: StockService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router) { }

  ngOnInit(): void {

    if (GAccount.IsLoggedIn() && this.isSignupConfirm()) {

      this.getProducts();
    }
  }

  getProducts() {

    SharedIonic.loading(this.loadingController);

    this.stockService.GetStockbyDelivererId(GAccount.DelivererId.toString()).subscribe(
      res => {
        console.log(res);
        this.products = res;
        SharedIonic.dismissLoading(this.loadingController);
      },
      err => {
        console.log(err);
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
