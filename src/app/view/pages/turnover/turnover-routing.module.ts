import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurnoverComponent } from './turnover.component';

const routes: Routes = [{ path: '', component: TurnoverComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnoverRoutingModule { }
