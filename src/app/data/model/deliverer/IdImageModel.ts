export interface IIdImageModel {

    id: number;
    name: string;
    img: string;
}

export class IdImageModel implements IIdImageModel {

    id: number;
    name: string;
    img: string;

    constructor(
        id: number,
        name: string,
        img: string
    ) {
        this.id = id;
        this.name = name;
        this.img = img;
    }
}
