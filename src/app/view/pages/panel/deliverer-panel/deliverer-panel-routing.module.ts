import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DelivererPanelComponent } from './deliverer-panel.component';

const routes: Routes = [{ path: '', component: DelivererPanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelivererPanelRoutingModule { }
