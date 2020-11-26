import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Page500RoutingModule } from './page500-routing.module';
import { Page500Component } from './page500.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [Page500Component],
  imports: [
    CommonModule,
    Page500RoutingModule,
    IonicModule
  ]
})
export class Page500Module { }
