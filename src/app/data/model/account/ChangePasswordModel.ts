export interface IChangePasswordModel {
  oldPassword: string;
  newPassword: string;
  rePassword: string;
}

export class ChangePasswordModel implements IChangePasswordModel {
  oldPassword: string;
  newPassword: string;
  rePassword: string;

  constructor(OldPassword: string, NewPassword: string, RePassword: string) {
    this.oldPassword = OldPassword;
    this.newPassword = NewPassword;
    this.rePassword = RePassword;
  }
}
