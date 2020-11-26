import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupConfirmRoutingModule } from './signup-confirm-routing.module';
import { SignupConfirmComponent } from './signup-confirm.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountInterceptor } from '../../../core/utility/account.interceptor';
import { AccountService } from '../../../data/service/auth/account.service';


@NgModule({
  declarations: [SignupConfirmComponent],
  imports: [
    CommonModule,
    SignupConfirmRoutingModule,
    IonicModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccountInterceptor,
      multi: true
    },
    AccountService
  ]
})
export class SignupConfirmModule { }
