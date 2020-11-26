export interface IVivaPaymentChargeTokenModel {

    amount: number; // price in euros * 100
    cvc: string; // three numbers behind card
    number: number; // number of the card 10 digits
    holderName: string;
    expirationYear: number;
    expirationMonth: number;
    sessionRedirectUrl: string;
}

export class VivaPaymentChargeTokenModel {

    amount: number;
    cvc: string;
    number: number;
    holderName: string;
    expirationYear: number;
    expirationMonth: number;
    sessionRedirectUrl: string;

    constructor(
        amount: number,
        cvc: string,
        number: number,
        holderName: string,
        expirationYear: number,
        expirationMonth: number,
        sessionRedirectUrl: string
    ) {
        this.amount = amount;
        this.cvc = cvc;
        this.number = number;
        this.holderName = holderName;
        this.expirationYear = expirationYear;
        this.expirationMonth = expirationMonth;
        this.sessionRedirectUrl = sessionRedirectUrl;
    }
}
