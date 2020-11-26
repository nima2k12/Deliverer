import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { StockService } from '../../../data/service/deliverer/stock.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RedirectComponent } from './redirect/redirect.component';


@NgModule({
  declarations: [PaymentComponent, RedirectComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    StockService,
    DatePipe
  ]
})
export class PaymentModule { }
