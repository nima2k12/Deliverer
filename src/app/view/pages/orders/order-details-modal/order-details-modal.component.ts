import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IOrderDetails } from '../../../../data/model/deliverer/OrderDetails';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss']
})
export class OrderDetailsModalComponent implements OnInit {

  @Input() order: IOrderDetails;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit(): void {

  }

  ionViewDidEnter() {

  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }
}
