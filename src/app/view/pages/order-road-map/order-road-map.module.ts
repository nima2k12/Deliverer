import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoadMapRoutingModule } from './order-road-map-routing.module';
import { OrderRoadMapComponent } from './order-road-map.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AccountInterceptor } from '../../../core/utility/account.interceptor';
import { DelivererService } from '../../../data/service/deliverer/deliverer.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';


@NgModule({
  declarations: [OrderRoadMapComponent],
  imports: [
    CommonModule,
    OrderRoadMapRoutingModule,
    IonicModule,
    FormsModule,
    HttpClientModule
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
export class OrderRoadMapModule { }
