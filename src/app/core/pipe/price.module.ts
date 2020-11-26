import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FranceCurrencyPipe } from './price/FranceCurrency.pipe';
import { IonicModule } from '@ionic/angular';

@NgModule({
   declarations: [
      FranceCurrencyPipe
   ],
   imports: [
      CommonModule,
      IonicModule
   ],
   exports: [FranceCurrencyPipe],
   providers: [CurrencyPipe]
})
export class PriceModule { }
