import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { StockService } from '../../../data/service/deliverer/stock.service';
import { GAccount } from '../../../core/common/GAccount';
import { SharedIonic } from '../../../core/common/SharedIonic';

@Component({
  selector: 'app-turnover',
  templateUrl: './turnover.component.html',
  styleUrls: ['./turnover.component.scss']
})
export class TurnoverComponent implements OnInit {

  turnover = '0';

  constructor(
    private stockService: StockService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router) { }

  ngOnInit(): void {

    if (GAccount.IsLoggedIn() && this.isSignupConfirm()) {

      this.getTurnoverBydelivererId();
    }
  }

  doRefresh(event) {

    setTimeout(() => {
      if (GAccount.IsLoggedIn() && this.isSignupConfirm()) {

        this.getTurnoverBydelivererId();
      }
      event.target.complete();
    }, 500);
  }

  getTurnoverBydelivererId() {

    SharedIonic.loading(this.loadingController);

    this.stockService.GetTurnoverBydelivererId(GAccount.DelivererId.toString()).subscribe(
      res => {
        this.turnover = res;
        SharedIonic.dismissLoading(this.loadingController);
      },
      err => {
        SharedIonic.dismissLoading(this.loadingController);
      }
    );
  }

  isLoggedIn() {
    return GAccount.IsLoggedIn();
  }

  isSignupConfirm() {
    return GAccount.SignupStatus;
  }
}
