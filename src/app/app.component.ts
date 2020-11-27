import { Component, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GAccount } from './core/common/GAccount';
import { G } from './core/common/G';
import { Location } from '@angular/common';
import { Urls } from './core/common/Urls';
import { DelivererService } from './data/service/deliverer/deliverer.service';
import { GeoOrderModel } from './data/model/deliverer/GeoOrderModel';
import { AccountService } from './data/service/auth/account.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  isConfirm = false;
  interval: any;

  appPages = [
    {
      title: 'Orders',
      url: Urls.OrdersUrl,
      icon: 'cart-outline'
    },
    {
      title: 'Update Stock',
      url: Urls.UpdateStockUrl,
      icon: 'refresh-outline'
    },
    {
      title: 'Turnover',
      url: Urls.TurnoverUrl,
      icon: 'cash-outline'
    }
    // {
    //   title: 'SignUp',
    //   url: Urls.AccountUrl,
    //   icon: 'log-in-outline'
    // }
  ];

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  dark = true;

  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private location: Location,
    private delivererService: DelivererService,
    private accountService: AccountService,
  ) {
    this.initializeApp();
    this.CheckTheme();
    this.backButtonEvent();

    if (GAccount.IsLoggedIn()) {

      this.interval = setInterval(() => {
        this.getSignupStatus();
      }, 3000);
    }
  }

  async ngOnInit() { }

  getSignupStatus() {

    this.accountService.IsRegisteredById(GAccount.DelivererId.toString()).subscribe(
      res => {

        if (res.toString() === '1') {
          if (!GAccount.SignupStatus) {
            this.onConfirm();
            // clearInterval(this.interval);
            setTimeout(() => {
              this.router.navigateByUrl(Urls.SignupConfirmUrl);
            }, 1000);
          }

        } else {
          if (GAccount.SignupStatus) {
            this.onDisable();
            setTimeout(() => {
              this.router.navigateByUrl(Urls.SignupConfirmUrl);
            }, 1000);
          }
        }
      },
      err => {
      }
    );
  }

  onDisable() {
    GAccount.SignupStatus = false;
    this.isConfirm = false;
    for (let index = 0; index < localStorage.length; index++) {
      if (localStorage.key(index) === 'signupStatus') {
        localStorage.removeItem('signupStatus');
        localStorage.setItem('signupStatus', '0');
        return;
      }
    }
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

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    for (let index = 0; index < localStorage.length; index++) {
      if (localStorage.key(index) === 'isDelivererTakeOrderState' && localStorage.getItem('isDelivererTakeOrderState') === '1') {
        GAccount.DelivererTakeOrderState = true;
      }
      else if (localStorage.key(index) === 'orderId') {
        GAccount.OrderId = localStorage.getItem('orderId');
        this.delivererService.GetOrderById(GAccount.OrderId).subscribe(
          res => {
            console.log(res);

            GAccount.OrderDeliver =
              new GeoOrderModel(
                res[0].id,
                GAccount.OrderId,
                res[0].longitude,
                res[0].latitude,
                res[0].customer_id,
                res[0].taken,
                null,
                null);
          }
        );
      }
      else if (localStorage.key(index) === 'delivererId') {
        GAccount.DelivererId = +localStorage.getItem('delivererId');
      }
      else if (localStorage.key(index) === 'signupStatus') {
        GAccount.SignupStatus = localStorage.getItem('signupStatus') === '0' ? false : true;
      }
      else if (localStorage.key(index) === 'nom') {
        GAccount.DelivererNom = localStorage.getItem('nom');
      }
      else if (localStorage.key(index) === 'mail') {
        GAccount.DelivererMail = localStorage.getItem('mail');
      }
      else if (localStorage.key(index) === 'phone') {
        GAccount.DelivererPhone = localStorage.getItem('phone');
      }
      else if (localStorage.key(index) === 'address') {
        GAccount.DelivererAddress = localStorage.getItem('address');
      }
      else if (localStorage.key(index) === 'birth') {
        GAccount.DelivererBirth = localStorage.getItem('birth');
      }
    }
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {

        if (!GAccount.IsLoggedIn() && this.router.url === Urls.AccountUrl) {
          this.presentAlertConfirm();
          return;
        }

        if (this.router.url !== Urls.OrdersUrl) {
          // await this.router.navigate(['/']);
          await this.location.back();
        } else if (this.router.url === Urls.OrdersUrl) {
          if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          } else {
            navigator['app'].exitApp();
          }
        }
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Are you sure for exit?',
      buttons: [{
        text: 'cancel',
        role: 'cancel',
        cssClass: 'main-alert',
        handler: (blah) => { }
      }, {
        text: 'exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });

    await alert.present();
  }

  CheckTheme() {

    let found = false;

    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) === 'theme') {
        found = true;
        if (localStorage.getItem('theme') === 'dark') {
          this.dark = true;
        } else {
          this.dark = false;
        }
      }
    }

    if (!found) {
      this.dark = true;
    }

    G.darkTheme = this.dark;
  }

  ThemeChanged() {

    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) === 'theme') {
        localStorage.removeItem('theme');
      }
    }

    if (!this.dark) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    G.darkTheme = !this.dark;
  }

  IsLoggedin(): boolean {
    return GAccount.IsLoggedIn();
  }

  isSignupConfirm() {
    return GAccount.SignupStatus;
  }

  IsDelivererTakeOrderState(): boolean {
    return GAccount.DelivererTakeOrderState;
  }

  IsDeliverer(): boolean {
    return GAccount.IsDeliverer();
  }
}
