export interface IVivaPaymentsResponse {

    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
}

export class VivaPaymentsResponse implements IVivaPaymentsResponse {

    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;

    constructor() {

    }
}
