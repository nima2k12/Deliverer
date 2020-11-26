import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../data/service/auth/account.service';
import { GAccount } from '../../../core/common/GAccount';
import { SharedIonic } from '../../../core/common/SharedIonic';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { Urls } from 'src/app/core/common/Urls';

@Component({
  selector: 'app-signup-confirm',
  templateUrl: './signup-confirm.component.html',
  styleUrls: ['./signup-confirm.component.scss']
})
export class SignupConfirmComponent implements OnInit {

  isConfirm = false;

  constructor(
    private accountService: AccountService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router) {

    this.isConfirm = GAccount.SignupStatus;
  }

  ngOnInit(): void {

    this.getSignupStatus();
  }

  doRefresh(event) {

    setTimeout(() => {

      this.getSignupStatus();
      event.target.complete();
    }, 2000);
  }

  getSignupStatus() {

    SharedIonic.loading(this.loadingController);

    this.accountService.IsRegisteredById(GAccount.DelivererId.toString()).subscribe(
      res => {
        console.log('res');
        console.log(res);
        if (res.toString() === '1') {
          this.onConfirm();
        } else {
          SharedIonic.toast(this.toastController, 'not activated');
        }
        SharedIonic.dismissLoading(this.loadingController);
        if (res.toString() === '1') {
          setTimeout(() => {
            this.router.navigateByUrl(Urls.OrdersUrl);
          }, 3000);
        }
      },
      err => {
        console.log('err');
        console.log(err);
        SharedIonic.dismissLoading(this.loadingController);
        SharedIonic.toast(this.toastController, 'Failed');
      }
    );
  }

  onConfirm() {
    GAccount.SignupStatus = true;
    this.isConfirm = true;
    for (let index = 0; index < localStorage.length; index++) {
      if (localStorage.key(index) === 'signupStatus') {
        localStorage.removeItem('signupStatus');
        localStorage.setItem('signupStatus', '1');
        return;
      }
    }
  }
}
