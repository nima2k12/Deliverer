
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

export class SharedIonic {

    public static isLoading = false;

    constructor() { }

    // Alert

    public static async alert(alertController: AlertController) {
        const alert = await alertController.create({
            cssClass: 'main-alert',
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'This is an alert message.',
            buttons: ['OK']
        });

        await alert.present();
    }

    // Loading

    public static async loading(loadingController: LoadingController) {

        if (this.isLoading) {
            return;
        }

        this.isLoading = true;

        return await loadingController.create({
            spinner: null,
            duration: 500000,
            message: 'Please Wait',
            translucent: true,
            cssClass: 'main-loading',
            backdropDismiss: false
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss().then(() => { });
                }
            });
        });
    }

    public static async dismissLoading(loadingController: LoadingController) {

        if (!this.isLoading) {
            return;
        }
        this.isLoading = false;
        return await loadingController.dismiss().then(() => { });
    }

    // Toast

    public static async toast(toastController: ToastController, msg: string) {
        const toast = await toastController.create({
            message: msg,
            cssClass: 'main-toast',
            duration: 2000
        });
        toast.present();
    }

    public static async successToast(toastController: ToastController) {
        const toast = await toastController.create({
            message: 'Successfully Done',
            cssClass: 'main-success-toast',
            duration: 2000
        });
        toast.present();
    }

    public static async unSuccessToast(toastController: ToastController) {
        const toast = await toastController.create({
            message: 'UnSuccess',
            cssClass: 'main-unsuccess-toast',
            duration: 2000
        });
        toast.present();
    }
}
