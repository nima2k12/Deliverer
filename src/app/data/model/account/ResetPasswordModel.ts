export interface IResetPasswordModel {

    id: string;
    email: string;
    password: string;
}

export class ResetPasswordModel implements IResetPasswordModel {

    id: string;
    email: string;
    password: string;

    constructor(
        id: string,
        email: string,
        password: string
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
}
