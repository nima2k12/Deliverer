import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccountInterceptor } from '../../../../core/utility/account.interceptor';
import { AccountService } from '../../../../data/service/auth/account.service';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule
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
})
export class AccountModule { }
