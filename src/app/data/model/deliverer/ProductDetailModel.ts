export interface IProductDetailModel {

    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    img: string;
}

export class ProductDetailModel implements IProductDetailModel {

    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    img: string;

    constructor(
        id: number,
        name: string,
        description: string,
        price: number,
        discount: number,
        img: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.img = img;
    }
}
