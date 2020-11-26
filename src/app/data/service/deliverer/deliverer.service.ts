import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IIdImageModel } from '../../model/deliverer/IdImageModel';
import { IGeoLocationModel } from '../../model/deliverer/GeoLocationModel';
import { Observable } from 'rxjs';
import { IGeoOrderModel } from '../../model/deliverer/GeoOrderModel';
import { IOrderDetails } from '../../model/deliverer/OrderDetails';
import { ICustomerModel } from '../../model/deliverer/CustomerModel';
import { IDelivererPositionModel } from '../../model/deliverer/DelivererPositionModel';
import { ITakeOrderModel } from '../../model/deliverer/TakeOrderModel';
import { IProductModel } from '../../model/deliverer/ProductModel';
import { IProductDetailModel } from '../../model/deliverer/ProductDetailModel';
import { IDelivererStockModel } from '../../model/deliverer/DelivererStockModel';

@Injectable({
  providedIn: 'root'
})
export class DelivererService {

  private saveIdImageUrl = '/saveId.php';
  private saveRibImageUrl = '/saveRib.php';
  private getOrderByDistanceUrl = '/getOrderByDistance.php';
  private getOrderByIdUrl = '/getOrderById.php';
  private getCustomerByIdUrl = '/getCustomerById.php';
  private updatePositionUrl = '/updatePosition.php';
  private takeOrderUrl = '/takeOrder.php';
  private updateStockUrl = '/updateStock.php';
  private getProductsUrl = '/getProducts.php';
  private setDoneUrl = '/setDone.php';
  private getStockbyDelivererIdUrl = '/getStockbyDelivererId.php';

  constructor(private http: HttpClient) { }

  SaveRibImage(model: IIdImageModel) {

    const body = new HttpParams()
      .set('id', model.id.toString())
      .set('img', model.img)
      .set('name', model.name);

    console.log(body);

    return this.http
      .post(this.saveRibImageUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  SaveIdImage(model: IIdImageModel) {

    const body = new HttpParams()
      .set('id', model.id.toString())
      .set('img', model.img)
      .set('name', model.name);

    console.log(body);

    return this.http
      .post(this.saveIdImageUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  GetOrderByDistance(model: IGeoLocationModel): Observable<IGeoOrderModel[]> {

    const body = new HttpParams()
      .set('lat', model.lat.toString())
      .set('long', model.long.toString());

    console.log(body);

    return this.http
      .post<IGeoOrderModel[]>(this.getOrderByDistanceUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  GetOrderById(model: string): Observable<IOrderDetails[]> {

    const body = new HttpParams()
      .set('id', model);

    console.log(body);

    return this.http
      .post<IOrderDetails[]>(this.getOrderByIdUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  SetDone(model: string) {

    const body = new HttpParams()
      .set('id', model);

    console.log(body);

    return this.http
      // tslint:disable-next-line: max-line-length
      .post(this.setDoneUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  GetCustomerById(model: number): Observable<ICustomerModel> {

    const body = new HttpParams()
      .set('id', model.toString());

    console.log(body);

    return this.http
      .post<ICustomerModel>(this.getCustomerByIdUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  UpdatePosition(model: IDelivererPositionModel): Observable<IGeoLocationModel> {

    const body = new HttpParams()
      .set('lat', model.lat.toString())
      .set('long', model.long.toString())
      .set('delivererId', model.delivererId.toString());

    console.log(body);

    return this.http
      .post<IGeoLocationModel>(this.updatePositionUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  TakeOrder(model: ITakeOrderModel) {

    const body = new HttpParams()
      .set('delivId', model.delivId.toString())
      .set('orderId', model.orderId.toString());

    console.log(body);

    return this.http
      .post(this.takeOrderUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

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
}
