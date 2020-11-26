export interface ITakeOrderModel {

    delivId: number;
    orderId: string;
}

export class TakeOrderModel implements ITakeOrderModel {

    delivId: number;
    orderId: string;

    constructor(
        delivId: number,
        orderId: string
    ) {
        this.delivId = delivId;
        this.orderId = orderId;
    }
}
