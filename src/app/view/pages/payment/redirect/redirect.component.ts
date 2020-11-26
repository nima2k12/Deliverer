import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  @Input() redirectToACSForm: SafeResourceUrl;
  @Input() isRedirectToACSForm = false;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit(): void {
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }
}
