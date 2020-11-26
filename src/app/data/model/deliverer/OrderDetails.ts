export interface IOrderDetails {

    id: string;
    product_id: number;
    quantity: number;
    taken: number;
    deliverer_id: number;
    latitude: number;
    longitude: number;
    customer_id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    img: string;
}

export class OrderDetails implements IOrderDetails {

    id: string;
    product_id: number;
    quantity: number;
    taken: number;
    deliverer_id: number;
    latitude: number;
    longitude: number;
    customer_id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    img: string;

    constructor(
        id: string,
        product_id: number,
        quantity: number,
        taken: number,
        deliverer_id: number,
        latitude: number,
        longitude: number,
        customer_id: number,
        name: string,
        description: string,
        price: number,
        discount: number,
        img: string
    ) {
        this.id = id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.taken = taken;
        this.deliverer_id = deliverer_id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.customer_id = customer_id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.img = img;
    }
}
