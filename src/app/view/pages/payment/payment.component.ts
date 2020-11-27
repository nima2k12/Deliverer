import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { StockService } from '../../../data/service/deliverer/stock.service';
import { VivaPaymentChargeTokenModel } from '../../../data/model/deliverer/VivaPaymentChargeTokenModel';
import { TransactionModel } from '../../../data/model/deliverer/TransactionModel';
import { GAccount } from '../../../core/common/GAccount';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Urls } from 'src/app/core/common/Urls';
import { SharedIonic } from '../../../core/common/SharedIonic';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RedirectComponent } from './redirect/redirect.component';
import { DatePipe } from '@angular/common';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [Keyboard]
})
export class PaymentComponent implements OnInit {

  accessToken = '';
  chargeToken = '';
  redirectToACSForm: SafeResourceUrl;
  isRedirectToACSForm = false;
  form: FormGroup;
  price = 500;
  isKeyboardHide = true;

  constructor(
    private stockService: StockService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public routerOutlet: IonRouterOutlet,
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    public modalCtrl: ModalController,
    public router: Router,
    private keyboard: Keyboard,
    public datepipe: DatePipe) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      number: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      date: ['', [Validators.required]],
      nom: ['', [Validators.required]]
    });

    // this.form.setValue({ cvc: '111', number: '4111111111111111', date: '2030-10' });
  }

  ionViewWillEnter() {
    this.keyboard.onKeyboardWillShow().subscribe(() => {
      this.isKeyboardHide = false;
      // console.log('SHOWK');
    });

    this.keyboard.onKeyboardWillHide().subscribe(() => {
      this.isKeyboardHide = true;
      // console.log('HIDEK');
    });
  }

  onCancel() {

    this.router.navigateByUrl(Urls.UpdateStockUrl);
  }

  GetPayAccessToken() {


    if (GAccount.IsLoggedIn() && this.isSignupConfirm()) {

      SharedIonic.loading(this.loadingController);

      this.stockService.VivaPayments().subscribe(
        res => {
          this.accessToken = res.access_token;
          this.Pay();
        },
        err => {
          SharedIonic.toast(this.toastController, 'Failed');
          SharedIonic.dismissLoading(this.loadingController);
        }
      );
    }
  }

  Pay() {

    this.stockService.VivaPaymentChargeToken(
      new VivaPaymentChargeTokenModel(
        this.price * 100,
        this.form.value.cvc,
        this.form.value.number,
        this.form.value.nom,
        +this.datepipe.transform((this.form.value.date), 'yyyy'),
        +this.datepipe.transform((this.form.value.date), 'MM'),
        'https://example.com'
      ), this.accessToken
    ).subscribe(
      res => {
        this.isRedirectToACSForm = false;
        this.chargeToken = res.chargeToken;
        if (res.redirectToACSForm != null) {
          this.redirectToACSForm = this.domSanitizer.bypassSecurityTrustHtml(res.redirectToACSForm);
          this.isRedirectToACSForm = true;
          this.presentRedirectModal();
        }
        this.PayResponseToAPI();
      },
      err => {
        SharedIonic.toast(this.toastController, 'Failed');
        SharedIonic.dismissLoading(this.loadingController);
      }
    );
  }

  async presentRedirectModal() {
    const modal = await this.modalCtrl.create({
      component: RedirectComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { redirectToACSForm: this.redirectToACSForm, isRedirectToACSForm: this.isRedirectToACSForm }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
  }

  PayResponseToAPI() {

    this.stockService.Transaction(
      new TransactionModel(
        this.price * 100,
        this.chargeToken,
        GAccount.DelivererMail,
        GAccount.DelivererPhone,
        this.form.value.nom,
        this.accessToken
      )
    ).subscribe(
      res => {
        SharedIonic.toast(this.toastController, 'Success');
        SharedIonic.dismissLoading(this.loadingController);
      },
      err => {
        SharedIonic.toast(this.toastController, 'Failed');
        SharedIonic.dismissLoading(this.loadingController);
      }
    );
  }

  isSignupConfirm() {
    return GAccount.SignupStatus;
  }
}
