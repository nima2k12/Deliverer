import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnoverRoutingModule } from './turnover-routing.module';
import { TurnoverComponent } from './turnover.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockService } from '../../../data/service/deliverer/stock.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [TurnoverComponent],
  imports: [
    CommonModule,
    TurnoverRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [StockService]
})
export class TurnoverModule { }
