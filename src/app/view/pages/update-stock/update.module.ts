import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatePageRoutingModule } from './update-routing.module';
import { UpdatePage } from './update.page';
import { StockService } from '../../../data/service/deliverer/stock.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UpdatePageRoutingModule
  ],
  declarations: [UpdatePage],
  providers: [
    StockService
  ]
})
export class UpdatePageModule {}
