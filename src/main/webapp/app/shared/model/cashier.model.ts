export interface ICashier {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export class Cashier implements ICashier {
    constructor(public id?: number, public firstName?: string, public lastName?: string, public email?: string) {}
}
