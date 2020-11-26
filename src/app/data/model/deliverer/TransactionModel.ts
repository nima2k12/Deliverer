export interface ITransactionModel {

    amount: number; // price in euros * 100,
    ctocken: string; // chargeToken
    mail: string;
    phone: string;
    nom: string;
    token: string; // the Bearer Token
}

export class TransactionModel implements ITransactionModel {

    amount: number; // price in euros * 100,
    ctocken: string; // chargeToken
    mail: string;
    phone: string;
    nom: string;
    token: string; // the Bearer Token

    constructor(
        amount: number,
        ctocken: string,
        mail: string,
        phone: string,
        nom: string,
        token: string
    ) {
        this.amount = amount;
        this.ctocken = ctocken;
        this.mail = mail;
        this.phone = phone;
        this.nom = nom;
        this.token = token;
    }
}
