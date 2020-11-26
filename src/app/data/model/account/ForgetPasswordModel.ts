export interface IForgetPasswordModel {
  email: string;
}

export class ForgetPasswordModel implements IForgetPasswordModel {
  email: string;

  constructor(Email: string) {
    this.email = Email;
  }
}
