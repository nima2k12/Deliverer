import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordModel } from '../../../../../data/model/account/ForgetPasswordModel';
import { AccountService } from '../../../../../data/service/auth/account.service';
import { SharedIonic } from '../../../../../core/common/SharedIonic';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(
    private accountService: AccountService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      email: ['', Validators.required]
    });
  }

  ForgetPassword() {

    if (this.form.valid) {

      SharedIonic.loading(this.loadingController);

      this.accountService.ForgetPassword(
        new ForgetPasswordModel(this.form.value.email)
      );
    }
  }
}
