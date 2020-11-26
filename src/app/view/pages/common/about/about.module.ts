import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    IonicModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
