import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import {Product} from "app/shared/model/product.model";

@Injectable({ providedIn: 'root' })
export class CashDeskService {
    public inventoryControllerBaseUrl = SERVER_API_URL + '/api/inventory-controller/';


    constructor(private httpClient: HttpClient) {}

/*
FOR INVENTORY RESOURCE
 */
    public updateStock(id: number, amount: number){
        return this.httpClient.post<boolean>(this.inventoryControllerBaseUrl + 'update-stock/' + id + '/' + amount,null, { observe: 'response' });
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
    public verifyProductStock(id: number){
        return this.httpClient.get<boolean>(this.inventoryControllerBaseUrl + 'verify-product-stock/' + id , { observe: 'response' });
    }

    /*
FOR INVENTORY RESOURCE
 */
//POST /api/card-reader-controller/debit-card/{price}/{cardNumber}


}
