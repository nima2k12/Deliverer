export interface ICustomerModel {

    name: string;
    address: string;
    dateofbirth: string;
    mail: string;
    phone: string;
}

export class CustomerModel {

    name: string;
    address: string;
    dateofbirth: string;
    mail: string;
    phone: string;

    constructor(
        name: string,
        address: string,
        dateofbirth: string,
        mail: string,
        phone: string
    ) {
        this.name = name;
        this.address = address;
        this.dateofbirth = dateofbirth;
        this.mail = mail;
        this.phone = phone;
    }
}
