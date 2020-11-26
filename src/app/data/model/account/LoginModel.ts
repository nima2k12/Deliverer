export interface ILoginModel {

  email: string;
  password: string;
}

export class LoginModel implements ILoginModel {

  email: string;
  password: string;

  constructor(Email: string, Password: string) {
    this.email = Email;
    this.password = Password;
  }
}
