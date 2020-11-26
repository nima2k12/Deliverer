export interface IProductModel {

    id: number[];
    qty: number[];
    deliverId: number;
}

export class ProductModel implements IProductModel {

    id: number[];
    qty: number[];
    deliverId: number;

    constructor(
        id: number[],
        qty: number[],
        deliverId: number
    ) {
        this.id = id;
        this.qty = qty;
        this.deliverId = deliverId;
    }
}
