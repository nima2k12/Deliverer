import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Page404RoutingModule } from './page404-routing.module';
import { Page404Component } from './page404.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [Page404Component],
  imports: [
    CommonModule,
    IonicModule,
    Page404RoutingModule
  ]
})
export class Page404Module { }
