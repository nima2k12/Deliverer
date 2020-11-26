import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupConfirmComponent } from './signup-confirm.component';

const routes: Routes = [{ path: '', component: SignupConfirmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupConfirmRoutingModule { }
