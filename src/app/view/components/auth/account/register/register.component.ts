import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../../data/service/auth/account.service';
import { SharedIonic } from '../../../../../core/common/SharedIonic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { RegisterModel } from '../../../../../data/model/account/RegisterModel';
import { Geolocation } from '@capacitor/core';
import { Urls } from 'src/app/core/common/Urls';
import { GAccount } from '../../../../../core/common/GAccount';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isRegisterd = false;
  form: FormGroup;

  latitude = -1;
  longitude = -1;
  isGeoSuccess = false;
  geoWatchId: string;
  delivererId;

  constructor(
    private accountService: AccountService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router,
    private fb: FormBuilder,
    public datepipe: DatePipe) {

    this.getLocation();
  }

  ngOnInit(): void {

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
          }
          localStorage.setItem('delivererId', this.delivererId);
          localStorage.setItem('signupStatus', '0');
          GAccount.DelivererId = +this.delivererId;
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
