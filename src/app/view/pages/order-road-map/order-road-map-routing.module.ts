import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderRoadMapComponent } from './order-road-map.component';

const routes: Routes = [{ path: '', component: OrderRoadMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoadMapRoutingModule { }
