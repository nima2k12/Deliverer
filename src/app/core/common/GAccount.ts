import { IGeoOrderModel } from '../../data/model/deliverer/GeoOrderModel';
export class GAccount {

    public static DelivererTakeOrderState = false;
    public static OrderId = '0';
    public static SignupStatus = false;
    public static DelivererId = 0; // this should be 0 but for test fake login, set to 1
    public static DelivererNom = '';
    public static DelivererMail = '';
    public static DelivererPhone = '';
    public static DelivererAddress = '';
    public static DelivererBirth = '';
    public static OrderDeliver: IGeoOrderModel;

    public static IsLoggedIn() {

        return this.DelivererId === 0 ? false : true;
    }

    public static IsDeliverer() {

        return true;
    }

    public static IsDelivererTakeOrderState() {

        return this.DelivererTakeOrderState;
    }
}
