import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DelivererService } from '../../../../data/service/deliverer/deliverer.service';
import { SharedIonic } from '../../../../core/common/SharedIonic';
import { IdImageModel } from '../../../../data/model/deliverer/IdImageModel';
import { GAccount } from '../../../../core/common/GAccount';
import { Urls } from '../../../../core/common/Urls';
import { Router } from '@angular/router';
const { Camera } = Plugins;

@Component({
  selector: 'app-deliverer-panel',
  templateUrl: './deliverer-panel.component.html',
  styleUrls: ['./deliverer-panel.component.scss']
})
export class DelivererPanelComponent implements OnInit {

  imageBase64: string;
  imageShow = '';
  imageRibBase64: string;
  imageRibShow = '';
  selected = '1';

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    private delivererService: DelivererService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 85,
      allowEditing: false,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64
    });

    this.imageBase64 = image.base64String;
    this.imageShow = 'data:image/' + image.format + ';base64,' + image.base64String;
  }

  segmentChanged(e) {
    this.selected = e.detail.value;
  }

  async takePictureRib() {
    const image = await Camera.getPhoto({
      quality: 85,
      allowEditing: false,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64
    });

    this.imageRibBase64 = image.base64String;
    this.imageRibShow = 'data:image/' + image.format + ';base64,' + image.base64String;
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  sendImage() {

    if (this.imageShow !== '' && this.imageBase64 !== '' && this.imageBase64 != null) {

      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
      const lengthOfCode = 40;
      const name = this.makeRandom(lengthOfCode, possible) + '.jpg';

      SharedIonic.loading(this.loadingController);

      this.delivererService.SaveIdImage(new IdImageModel(GAccount.DelivererId, name, this.imageBase64)).subscribe(
        res => {
          SharedIonic.toast(this.toastController, 'Successfully Done');
          SharedIonic.dismissLoading(this.loadingController);
        },
        err => {
          if (err.error.text === 'Photo enregistrée !') {
            SharedIonic.toast(this.toastController, 'Successfully Done');
          } else {
            SharedIonic.toast(this.toastController, 'Failed');
          }

          SharedIonic.dismissLoading(this.loadingController);
        }
      );
    }
  }

  sendImageRib() {

    if (this.imageRibShow !== '' && this.imageRibBase64 !== '' && this.imageRibBase64 != null) {

      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
      const lengthOfCode = 40;
      const name = this.makeRandom(lengthOfCode, possible) + '.jpg';

      SharedIonic.loading(this.loadingController);

      this.delivererService.SaveRibImage(new IdImageModel(GAccount.DelivererId, name, this.imageRibBase64)).subscribe(
        res => {
          SharedIonic.toast(this.toastController, 'Successfully Done');
          SharedIonic.dismissLoading(this.loadingController);
        },
        err => {
          if (err.error.text === 'Photo enregistrée !') {
            SharedIonic.toast(this.toastController, 'Successfully Done');
          } else {
            SharedIonic.toast(this.toastController, 'Failed');
          }

          SharedIonic.dismissLoading(this.loadingController);
        }
      );
    }
  }

  onNavigateHome() {

    this.router.navigateByUrl(Urls.OrdersUrl);
    return;
  }
}
