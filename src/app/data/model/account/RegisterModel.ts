export interface IRegisterModel {

  phone: string;
  birth: string;
  mail: string;
  nom: string;
  lat: number;
  long: number;
  address: string;
}

export class RegisterModel implements IRegisterModel {

  phone: string;
  birth: string;
  mail: string;
  nom: string;
  lat: number;
  long: number;
  address: string;

  constructor(
    phone: string,
    birth: string,
    mail: string,
    nom: string,
    lat: number,
    long: number,
    address: string) {
    this.phone = phone;
    this.birth = birth;
    this.mail = mail;
    this.nom = nom;
    this.lat = lat;
    this.long = long;
    this.address = address;
  }
}
