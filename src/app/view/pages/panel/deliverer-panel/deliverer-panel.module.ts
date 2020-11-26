import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DelivererPanelRoutingModule } from './deliverer-panel-routing.module';
import { DelivererPanelComponent } from './deliverer-panel.component';
import { IonicModule } from '@ionic/angular';
import { DelivererService } from '../../../../data/service/deliverer/deliverer.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccountInterceptor } from '../../../../core/utility/account.interceptor';


@NgModule({
  declarations: [DelivererPanelComponent],
  imports: [
    CommonModule,
    DelivererPanelRoutingModule,
    IonicModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccountInterceptor,
      multi: true
    },
    DelivererService
  ]
})
export class DelivererPanelModule { }
