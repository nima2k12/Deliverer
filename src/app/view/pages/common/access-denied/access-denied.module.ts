import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessDeniedRoutingModule } from './access-denied-routing.module';
import { AccessDeniedComponent } from './access-denied.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    CommonModule,
    IonicModule,
    AccessDeniedRoutingModule
  ]
})
export class AccessDeniedModule { }
