export interface IGeoLocationModel {

    long: number;
    lat: number;
}

export class GeoLocationModel implements IGeoLocationModel {

    long: number;
    lat: number;

    constructor(
        long: number,
        lat: number
    ) {
        this.long = long;
        this.lat = lat;
    }
}
