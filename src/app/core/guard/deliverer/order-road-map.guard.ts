import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GAccount } from '../../common/GAccount';

@Injectable({
    providedIn: 'root'
})
export class OrderRoadMapGuard implements CanActivate {

    constructor() { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return GAccount.DelivererTakeOrderState;
    }

}
