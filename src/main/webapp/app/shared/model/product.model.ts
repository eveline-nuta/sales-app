import { IStockItem } from 'app/shared/model//stock-item.model';

export interface IProduct {
    id?: number;
    name?: string;
    price?: number;
    barcode?: string;
    stockItem?: IStockItem;
}

export class Product implements IProduct {
    constructor(public id?: number, public name?: string, public price?: number, public barcode?: string, public stockItem?: IStockItem) {}
}
