import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GAccount } from '../../../core/common/GAccount';
import { Urls } from '../../../core/common/Urls';
import { AccountService } from '../../../data/service/auth/account.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  isConfirm = false;
  interval: any;

  constructor(
    private accountService: AccountService,
    private router: Router) {

    if (!GAccount.IsLoggedIn()) {
      this.router.navigateByUrl(Urls.AccountUrl);
    }
    // else if (GAccount.IsLoggedIn() && !GAccount.SignupStatus) {

    //   this.interval = setInterval(() => {
    //     this.getSignupStatus();
    //   }, 3000);
    // }
  }

  getSignupStatus() {

    this.accountService.IsRegisteredById(GAccount.DelivererId.toString()).subscribe(
      res => {
        if (res.toString() === '1') {
          this.onConfirm();
          clearInterval(this.interval);
          setTimeout(() => {
            this.router.navigateByUrl(Urls.SignupConfirmUrl);
          }, 1000);
        }
      },
      err => {
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
