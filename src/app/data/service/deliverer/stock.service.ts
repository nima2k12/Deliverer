import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductDetailModel } from '../../model/deliverer/ProductDetailModel';
import { IProductModel } from '../../model/deliverer/ProductModel';
import { ITransactionModel } from '../../model/deliverer/TransactionModel';
import { IVivaPaymentChargeTokenModel } from '../../model/deliverer/VivaPaymentChargeTokenModel';
import { IVivaPaymentsResponse } from '../../model/deliverer/VivaPaymentsResponse';
import { IVivaPaymentChargeTokenResponse } from '../../model/deliverer/VivaPaymentChargeTokenResponse';
import { IStockModel } from '../../model/deliverer/StockModel';
import { IDelivererStockModel } from '../../model/deliverer/DelivererStockModel';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private updateStockUrl = 'https://scandent-realignmen.000webhostapp.com/updateStock.php';
  private getProductsUrl = 'https://scandent-realignmen.000webhostapp.com/getProducts.php';
  private transactionUrl = 'https://scandent-realignmen.000webhostapp.com/transaction.php';
  private getStockbyDelivererIdUrl = 'https://scandent-realignmen.000webhostapp.com/getStockbyDelivererId.php';
  // private vivapaymentsUrl = 'https://demo-accounts.vivapayments.com/connect/token';
  private vivapaymentsUrl = 'https://scandent-realignmen.000webhostapp.com/getToken.php';
  private setDoneUrl = 'https://scandent-realignmen.000webhostapp.com/setDone.php';
  private getTurnoverBydelivererIdUrl = 'https://scandent-realignmen.000webhostapp.com/getTurnoverBydelivererId.php';
  private vivapaymentchargetokensUrl = 'https://demo-api.vivapayments.com/nativecheckout/v2/chargetokens';

  constructor(private http: HttpClient) { }

  UpdateStock(model: IProductModel) {

    const body = new HttpParams()
      .set('deliverId', model.deliverId.toString())
      .set('id', model.id.toString())
      .set('qty', model.qty.toString());

    console.log(body);

    return this.http
      // tslint:disable-next-line: max-line-length
      .post(this.updateStockUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  SetDone(model: string) {

    const body = new HttpParams()
      .set('id', model);

    console.log(body);

    return this.http
      // tslint:disable-next-line: max-line-length
      .post(this.setDoneUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  GetProducts(): Observable<IProductDetailModel[]> {

    return this.http
      .post<IProductDetailModel[]>(this.getProductsUrl, null, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  GetStockbyDelivererId(model: string): Observable<IDelivererStockModel[]> {

    const body = new HttpParams()
      .set('id', model);

    return this.http
      .post<IDelivererStockModel[]>(this.getStockbyDelivererIdUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }


  GetTurnoverBydelivererId(model: string): Observable<string> {

    const body = new HttpParams()
      .set('id', model);

    return this.http
      // tslint:disable-next-line: max-line-length
      .post<string>(this.getTurnoverBydelivererIdUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  Transaction(model: ITransactionModel) {

    const body = new HttpParams()
      .set('amount', model.amount.toString())
      .set('ctoken', model.ctocken)
      .set('mail', model.mail)
      .set('phone', model.phone)
      .set('nom', model.nom)
      .set('token', model.token);

    console.log(body);

    return this.http
      .post(
        this.transactionUrl,
        body,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      );
  }

  VivaPayments(): Observable<IVivaPaymentsResponse> {

    // const userPass = 'cmtrczhmNjFucmEyM29jdm5heGRidTZ3Y21uazV0N2pkaHJtdHA4cGc0cjA3LmFwcHMudml2YXBheW1lbnRzLmNvbTprMTM5MWpldDg3eWF2UHAzb2M4Y2Y4TUU0T2UwRlI=';

    // const body = new HttpParams()
    //   .set('grant-type', 'client_credentials');

    return this.http
      .post<IVivaPaymentsResponse>(
        this.vivapaymentsUrl,
        null
      );
  }

  VivaPaymentChargeToken(model: IVivaPaymentChargeTokenModel, token: string): Observable<IVivaPaymentChargeTokenResponse> {

    return this.http
      .post<IVivaPaymentChargeTokenResponse>(
        this.vivapaymentchargetokensUrl,
        model,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
        }
      );
  }
}
