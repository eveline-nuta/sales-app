export interface IReceipt {
    id?: number;
    receiptNumber?: string;
    date?: string;
    paymentAmount?: string;
    cashierName?: string;
}

export class Receipt implements IReceipt {
    constructor(
        public id?: number,
        public receiptNumber?: string,
        public date?: string,
        public paymentAmount?: string,
        public cashierName?: string
    ) {}
}
