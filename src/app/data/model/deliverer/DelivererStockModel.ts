export interface IDelivererStockModel {

    id: number;
    product_id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    discount: number;
    img: string;
    deliverer_id: string;
}

export class DelivererStockModel implements IDelivererStockModel {

    id: number;
    product_id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    discount: number;
    img: string;
    deliverer_id: string;

    constructor(
        id: number,
        product_id: string,
        name: string,
        description: string,
        quantity: number,
        price: number,
        discount: number,
        img: string,
        deliverer_id: string
    ) {
        this.id = id;
        this.product_id = product_id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.discount = discount;
        this.img = img;
        this.deliverer_id = deliverer_id;
    }
}
