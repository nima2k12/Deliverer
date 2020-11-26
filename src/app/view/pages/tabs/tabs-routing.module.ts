import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'update',
        loadChildren: () => import('../update-stock/update.module').then(m => m.UpdatePageModule)
      },
      {
        path: 'Turnover',
        loadChildren: () => import('../turnover/turnover.module').then(m => m.TurnoverModule)
      },
      {
        path: '',
        redirectTo: '/tabs/orders',
        pathMatch: 'full'
      },
      // Error 404!
      { path: '**', loadChildren: () => import('../../../view/pages/common/page404/page404.module').then(m => m.Page404Module) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
