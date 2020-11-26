import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountService } from '../../../data/service/auth/account.service';
import { AccountInterceptor } from '../../../core/utility/account.interceptor';
import { LoginComponent } from './account/login/login.component';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './account/register/register.component';
import { ForgetPasswordComponent } from './account/forget-password/forget-password.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgetPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccountInterceptor,
      multi: true
    },
    AccountService,
    Geolocation,
    NativeGeocoder,
    DatePipe
  ],
  exports: [
    RegisterComponent
  ]
})
export class AuthModule { }
