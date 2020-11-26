import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IRegisterModel } from '../../model/account/RegisterModel';
import { ILoginModel } from '../../model/account/LoginModel';
import { IForgetPasswordModel } from '../../model/account/ForgetPasswordModel';
import { IChangePasswordModel } from '../../model/account/ChangePasswordModel';
import { IResetPasswordModel } from '../../model/account/ResetPasswordModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // Urls
  private loginUrl = '';
  private RegisterUrl = '/registerdelivcbd.php';
  private IsRegisteredByIdUrl = '/isRegisteredById.php';
  private ForgetPasswordUrl = '';
  private ChangePasswordUrl = '';
  private ResetPasswordUrl = '';

  constructor(private http: HttpClient) { }

  Register(model: IRegisterModel) {

    const body = new HttpParams()
      .set('mail', model.mail)
      .set('nom', model.nom)
      .set('phone', model.phone)
      .set('long', model.long.toString())
      .set('lat', model.lat.toString())
      .set('birth', model.birth)
      .set('address', model.address);

    return this.http
      .post(this.RegisterUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  IsRegisteredById(model: string) {

    const body = new HttpParams()
      .set('id', model);

    return this.http
      .post(this.IsRegisteredByIdUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }


  // ******************* Useless ******************* //

  Login(model: ILoginModel) {

    return this.http
      .post(this.loginUrl, model, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  ForgetPassword(model: IForgetPasswordModel) {

    return this.http
      .post(this.ForgetPasswordUrl, model, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  ChangePassword(model: IChangePasswordModel) {

    return this.http
      .post(this.ChangePasswordUrl, model, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }

  ResetPassword(model: IResetPasswordModel) {

    return this.http
      .post(this.ResetPasswordUrl, model, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  }
}
