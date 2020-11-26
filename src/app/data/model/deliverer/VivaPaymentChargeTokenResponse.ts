export interface IVivaPaymentChargeTokenResponse {

    chargeToken: string;
    redirectToACSForm: string;
}

export class VivaPaymentChargeTokenResponse implements IVivaPaymentChargeTokenResponse {

    chargeToken: string;
    redirectToACSForm: string;

    constructor() {

    }
}
