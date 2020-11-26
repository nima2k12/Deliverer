export interface IGeoOrderModel {

    id: string;
    orderId: string;
    longitude: number;
    latitude: number;
    custid: number;
    taken: number;
    paid: number;
    distance: number;
}

export class GeoOrderModel implements IGeoOrderModel {

    id: string;
    orderId: string;
    longitude: number;
    latitude: number;
    custid: number;
    taken: number;
    paid: number;
    distance: number;

    constructor(
        id: string,
        orderId: string,
        longitude: number,
        latitude: number,
        custid: number,
        taken: number,
        paid: number,
        distance: number
    ) {
        this.id = id;
        this.orderId = orderId;
        this.longitude = longitude;
        this.latitude = latitude;
        this.custid = custid;
        this.taken = taken;
        this.paid = paid;
        this.distance = distance;
    }
}
