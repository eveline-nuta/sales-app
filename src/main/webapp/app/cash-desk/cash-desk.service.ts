import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import {Product} from "app/shared/model/product.model";
import {IDebit} from "app/shared/model/debit.model";

@Injectable({ providedIn: 'root' })
export class CashDeskService {
    public inventoryControllerBaseUrl = SERVER_API_URL + '/api/inventory-controller/';
    public cardReaderControllerBaseUrl = SERVER_API_URL + '/api/card-reader-controller/';

    constructor(private httpClient: HttpClient) {}

/*
FOR INVENTORY CONTROLLER
 */
    public updateStock(productId: number, amount: number){
        return this.httpClient.post<boolean>(this.inventoryControllerBaseUrl + 'update-stock/' + productId + '/' + amount,null, { observe: 'response' });
    }

    public getProduct(id: string){
        return this.httpClient.get<Product>(this.inventoryControllerBaseUrl + 'get-product/' + id , { observe: 'response' });
    }

    public verifyItem(id: number){
        return this.httpClient.get<boolean>(this.inventoryControllerBaseUrl + 'verify-item/' + id , { observe: 'response' });
    }

    removeProduct(id: number){
        return this.httpClient.delete<boolean>(this.inventoryControllerBaseUrl + 'remove-product/' + id , { observe: 'response' });
    }
    //useless
    public verifyProductStock(id: string){
        return this.httpClient.get<boolean>(this.inventoryControllerBaseUrl + 'verify-product-stock/' + id , { observe: 'response' });
    }
 /*
FOR CARD READER CONTROLLER
 */
    public debitCard(price: number, cardNumber: string){
        return this.httpClient.post<IDebit>(this.cardReaderControllerBaseUrl + 'debit-card/' + price + '/' + cardNumber,null, { observe: 'response' });
    }


    public validateCard(cardNumber: string, pin: string){
        return this.httpClient.post<boolean>(this.cardReaderControllerBaseUrl + 'validate-card/' + cardNumber + '/' + pin,null, { observe: 'response' });
    }


}
