import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersPageRoutingModule } from './orders-routing.module';
import { OrdersPage } from './orders.page';
import { DelivererService } from '../../../data/service/deliverer/deliverer.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AccountInterceptor } from 'src/app/core/utility/account.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GeoLocationModalComponent } from './GeoLocationModal/GeoLocationModal.component';
import { OrderDetailsModalComponent } from './order-details-modal/order-details-modal.component';
import { PriceModule } from '../../../core/pipe/price.module';


@NgModule({
  declarations: [OrdersPage, GeoLocationModalComponent, OrderDetailsModalComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    OrdersPageRoutingModule,
    PriceModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccountInterceptor,
      multi: true
    },
    DelivererService,
    Geolocation,
    NativeGeocoder
  ]
})
export class OrdersPageModule { }
