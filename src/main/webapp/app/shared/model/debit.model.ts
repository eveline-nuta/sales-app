export interface IDebit {
    id?: number;
    transactionId?: string;
    moneyAmount?: number;
    status?: boolean;
}

export class Debit implements IDebit {
    constructor(public id?: number, public transactionId?: string, public moneyAmount?: number, public status?: boolean) {
        this.status = this.status || false;
    }
}
