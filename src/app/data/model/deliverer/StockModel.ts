export interface IStockModel {

    id: number[];
    qty: number[];
    deliverid: string;
}

export class StockModel implements IStockModel {

    id: number[];
    qty: number[];
    deliverid: string;

    constructor(
        id: number[],
        qty: number[],
        deliverid: string
    ) {
        this.id = id;
        this.qty = qty;
        this.deliverid = deliverid;
    }
}
