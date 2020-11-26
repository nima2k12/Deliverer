export interface IDelivererPositionModel {

    delivererId: number;
    long: number;
    lat: number;
}

export class DelivererPositionModel implements IDelivererPositionModel {

    delivererId: number;
    long: number;
    lat: number;

    constructor(
        delivererId: number,
        long: number,
        lat: number
    ) {
        this.delivererId = delivererId;
        this.long = long;
        this.lat = lat;
    }
}
