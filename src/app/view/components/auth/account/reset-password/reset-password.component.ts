import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordModel } from '../../../../../data/model/account/ResetPasswordModel';
import { AccountService } from '../../../../../data/service/auth/account.service';
import { SharedIonic } from '../../../../../core/common/SharedIonic';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  @Input() email = '';
  @Input() id = '';

  constructor(
    private accountService: AccountService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      password: ['', Validators.required],
      rePassword: ['', Validators.required]
    });
  }

  ResetPassword() {

    if (this.form.valid) {

      if (this.form.value.password !== this.form.value.rePassword) {

        SharedIonic.toast(this.toastController, 'Password does not match');
        return;
      }

      SharedIonic.loading(this.loadingController);

      this.accountService.ResetPassword(
        new ResetPasswordModel(this.id, this.email, this.form.value.password)
      );
    }
  }
}
