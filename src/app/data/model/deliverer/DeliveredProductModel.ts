export interface IDeliveredProductModel {

    orderId: string;
    productId: string;
    productCount: number;
    isDelivered: boolean;
}

export class DeliveredProductModel implements IDeliveredProductModel {

    orderId: string;
    productId: string;
    productCount: number;
    isDelivered: boolean;

    constructor(
        orderId: string,
        productId: string,
        productCount: number,
        isDelivered: boolean
    ) {
        this.orderId = orderId;
        this.productId = productId;
        this.productCount = productCount;
        this.isDelivered = isDelivered;
    }
}
