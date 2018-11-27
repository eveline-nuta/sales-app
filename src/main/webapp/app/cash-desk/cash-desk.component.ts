import { Component, OnInit } from '@angular/core';
import {Account, Principal} from "app/core";
import {EventManager} from "@angular/platform-browser";
import {JhiEventManager} from "ng-jhipster";
import {Product} from "app/shared/model/product.model";

@Component({
    selector: 'cash-desk',
    templateUrl: './cash-desk.component.html',
    styleUrls: ['cash-desk.css']
})
export class CashDeskComponent implements OnInit {

    account: Account;
    isSaleStarted: boolean;
    products: Array<Product>;
    total: number;

    constructor(private principal: Principal, private eventManager: JhiEventManager) {
        let productMock = new Product();
        productMock.barcode = "1234567";
        productMock.name = "ceapa";
        productMock.price = 12;
        let productMock1 = new Product();
        productMock1.barcode = "524523";
        productMock1.name = "varza";
        productMock1.price = 45;
        this.total = 0;
        this.products = [productMock, productMock1];
        this.calculateTotal();
    }

    calculateTotal(){
        this.products.forEach((product) => {
            this.total = this.total + product.price;
        });
    }

    startNewSale(){
        this.isSaleStarted = true;
    }

    endSale(){
        this.isSaleStarted = false;
    }


    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }


}
