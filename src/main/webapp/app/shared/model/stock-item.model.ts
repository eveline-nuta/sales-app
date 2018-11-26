import { IProduct } from 'app/shared/model//product.model';

export interface IStockItem {
    id?: number;
    numberOfProducts?: number;
    barcode?: string;
    products?: IProduct[];
}

export class StockItem implements IStockItem {
    constructor(public id?: number, public numberOfProducts?: number, public barcode?: string, public products?: IProduct[]) {}
}
