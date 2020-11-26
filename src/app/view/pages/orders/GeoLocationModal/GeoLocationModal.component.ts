import { AfterViewInit, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IGeoOrderModel } from '../../../../data/model/deliverer/GeoOrderModel';

@Component({
  selector: 'app-GeoLocationModal',
  templateUrl: './GeoLocationModal.component.html',
  styleUrls: ['./GeoLocationModal.component.scss']
})
export class GeoLocationModalComponent implements AfterViewInit {

  @Input() order: IGeoOrderModel;

  isShow = false;

  constructor(public modalCtrl: ModalController) { }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.isShow = true;
      this.initMap();
    }, 500);
  }

  initMap() {
    const POSITION = { lat: +this.order.latitude, lng: +this.order.longitude };
    const MAP = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: POSITION
    });
    const marker = new google.maps.Marker({
      position: POSITION,
      map: MAP
    });
  }

  onOk() {
    this.dismiss(this.order);
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }
}
