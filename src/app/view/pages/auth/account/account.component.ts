import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@capacitor/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { GAccount } from '../../../../core/common/GAccount';
import { SharedIonic } from '../../../../core/common/SharedIonic';
import { Urls } from '../../../../core/common/Urls';
import { RegisterModel } from '../../../../data/model/account/RegisterModel';
import { AccountService } from '../../../../data/service/auth/account.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [Keyboard]
})
export class AccountComponent implements OnInit {

  isRegisterd = false;
  form: FormGroup;

  latitude = -1;
  longitude = -1;
  isGeoSuccess = false;
  geoWatchId: string;
  delivererId;
  isKeyboardHide = true;

  constructor(
    private accountService: AccountService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router,
    private fb: FormBuilder,
    private keyboard: Keyboard,
    public datepipe: DatePipe) {

  }

  ionViewWillEnter() {
    this.keyboard.onKeyboardWillShow().subscribe(() => {
      this.isKeyboardHide = false;
      console.log('SHOWK');
    });

    this.keyboard.onKeyboardWillHide().subscribe(() => {
      this.isKeyboardHide = true;
      console.log('HIDEK');
    });
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.getLocation();
    }, 500);

    if (GAccount.IsLoggedIn()) {
      this.isRegisterd = true;
    }

    this.form = this.fb.group({
      phone: ['', Validators.required],
      birth: ['', Validators.required],
      mail: ['', Validators.required],
      nom: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    console.log(position.coords);
    try {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.isGeoSuccess = true;
    } catch {
      this.isGeoSuccess = false;
    }
  }

  // testMarker() {

  //   let center = this.mapComponent.map.getCenter();
  //   this.mapComponent.addMarker(center.lat(), center.lng());
  // }

  onCancel() {

    this.router.navigateByUrl(Urls.OrdersUrl);
  }

  Signup() {

    if (this.form.valid) {

      if (!this.isGeoSuccess) {
        SharedIonic.toast(this.toastController, 'GeoLocation Failed!');
        return;
      }

      SharedIonic.loading(this.loadingController);

      this.accountService.Register(
        new RegisterModel(
          this.form.value.phone,
          this.datepipe.transform((this.form.value.birth), 'yyyy-MM-dd').toString(),
          this.form.value.mail,
          this.form.value.nom,
          this.latitude,
          this.longitude,
          this.form.value.address)
      ).subscribe(
        res => {
          console.log('res');
          console.log(res);
          SharedIonic.toast(this.toastController, 'Successfully Done');
          SharedIonic.dismissLoading(this.loadingController);
          this.delivererId = res;
          for (let index = 0; index < localStorage.length; index++) {
            if (localStorage.key(index) === 'delivererId') {
              localStorage.removeItem('delivererId');
            }
            else if (localStorage.key(index) === 'signupStatus') {
              localStorage.removeItem('signupStatus');
            }
            else if (localStorage.key(index) === 'nom') {
              localStorage.removeItem('nom');
            }
            else if (localStorage.key(index) === 'mail') {
              localStorage.removeItem('mail');
            }
            else if (localStorage.key(index) === 'phone') {
              localStorage.removeItem('phone');
            }
            else if (localStorage.key(index) === 'address') {
              localStorage.removeItem('address');
            }
            else if (localStorage.key(index) === 'birth') {
              localStorage.removeItem('birth');
            }
          }
          localStorage.setItem('delivererId', this.delivererId);
          localStorage.setItem('nom', this.form.value.nom);
          localStorage.setItem('mail', this.form.value.mail);
          localStorage.setItem('phone', this.form.value.phone);
          localStorage.setItem('address', this.form.value.address);
          localStorage.setItem('birth', this.datepipe.transform((this.form.value.birth), 'yyyy-MM-dd').toString());
          localStorage.setItem('signupStatus', '0');
          GAccount.DelivererId = +this.delivererId;
          GAccount.DelivererNom = this.form.value.nom;
          GAccount.DelivererMail = this.form.value.mail;
          GAccount.DelivererAddress = this.form.value.address;
          GAccount.DelivererBirth = this.form.value.birth;
          GAccount.DelivererTakeOrderState = false;
          GAccount.SignupStatus = false;
          this.router.navigateByUrl(Urls.DelivererPanelUrl);
        },
        err => {
          console.log('err');
          console.log(err);
          SharedIonic.toast(this.toastController, 'Error');
          SharedIonic.dismissLoading(this.loadingController);
        }
      );
    }
  }
}
