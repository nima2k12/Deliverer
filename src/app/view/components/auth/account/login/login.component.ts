import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../../data/service/auth/account.service';
import { LoginModel } from '../../../../../data/model/account/LoginModel';
import { Router } from '@angular/router';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { SharedIonic } from '../../../../../core/common/SharedIonic';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private accountService: AccountService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  Login() {

    SharedIonic.loading(this.loadingController);

    if (this.form.valid) {

      this.accountService.Login(
        new LoginModel(
          this.form.value.email,
          this.form.value.password)
      );
    }
  }
}
