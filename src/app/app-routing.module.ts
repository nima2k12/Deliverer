import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth/auth.guard';
import { OrderRoadMapGuard } from './core/guard/deliverer/order-road-map.guard';
import { DelivererGuard } from './core/guard/deliverer/deliverer.guard';

const routes: Routes = [

  // Main pages
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', loadChildren: () => import('./view/pages/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'home', loadChildren: () => import('./view/pages/home/home.module').then(m => m.HomeModule), pathMatch: 'full' },
  { path: 'about', loadChildren: () => import('./view/pages/common/about/about.module').then(m => m.AboutModule), pathMatch: 'full' },

  // Panel pages
  {
    path: 'panel',
    children: [
      // tslint:disable-next-line: max-line-length
      { path: 'delivererPanel', loadChildren: () => import('./view/pages/panel/deliverer-panel/deliverer-panel.module').then(m => m.DelivererPanelModule), canActivate: [AuthGuard] },
      // Error 404!
      { path: '**', loadChildren: () => import('./view/pages/common/page404/page404.module').then(m => m.Page404Module) }
    ]
  },
  // Auth pages
  // tslint:disable-next-line: max-line-length
  { path: 'account', loadChildren: () => import('./view/pages/auth/account/account.module').then(m => m.AccountModule), pathMatch: 'full' },

  // Most Common Pages
  { path: 'page404', loadChildren: () => import('./view/pages/common/page404/page404.module').then(m => m.Page404Module) },
  { path: 'page500', loadChildren: () => import('./view/pages/common/page500/page500.module').then(m => m.Page500Module) },
  // tslint:disable-next-line: max-line-length
  { path: 'accessDenied', loadChildren: () => import('./view/pages/common/access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'accessDenied/:msg', loadChildren: () => import('./view/pages/common/access-denied/access-denied.module').then(m => m.AccessDeniedModule) },

  // tslint:disable-next-line: max-line-length
  { path: 'OrderRoadMap', loadChildren: () => import('./view/pages/order-road-map/order-road-map.module').then(m => m.OrderRoadMapModule), canActivate: [AuthGuard, OrderRoadMapGuard, DelivererGuard] },

  // tslint:disable-next-line: max-line-length
  { path: 'SignupConfirm', loadChildren: () => import('./view/pages/signup-confirm/signup-confirm.module').then(m => m.SignupConfirmModule), canActivate: [AuthGuard] },

  { path: 'Payment', loadChildren: () => import('./view/pages/payment/payment.module').then(m => m.PaymentModule) },

  // Error 404!
  { path: '**', loadChildren: () => import('./view/pages/common/page404/page404.module').then(m => m.Page404Module) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
