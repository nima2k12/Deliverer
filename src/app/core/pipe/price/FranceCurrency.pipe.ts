import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'FranceCurrency'
})
export class FranceCurrencyPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) { }

  transform(value: any, currencyCode?: string, display?: string | boolean, digitsInfo?: string, locale?: string): string {
    if (value != null) {
      return this.currencyPipe.transform(value, 'EUR', '', digitsInfo, locale) + ' €';
    }
    return this.currencyPipe.transform(0, currencyCode, display, locale).split('0.00')[0] + ' €';
  }
}
