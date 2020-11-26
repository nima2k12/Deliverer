import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GAccount } from '../../common/GAccount';
import { Urls } from '../../common/Urls';

@Injectable({
  providedIn: 'root'
})
export class DelivererGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (GAccount.SignupStatus) {
      return true;
    } else {
      this.router.navigateByUrl(Urls.SignupConfirmUrl);
      return false;
    }
  }

}
