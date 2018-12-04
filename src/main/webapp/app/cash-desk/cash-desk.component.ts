import {Component, OnInit} from '@angular/core';
import {Account, Principal} from "app/core";
import {JhiEventManager} from "ng-jhipster";
import {Product} from "app/shared/model/product.model";
import {CashDeskService} from "app/cash-desk/cash-desk.service";


@Component({
    selector: 'cash-desk',
    templateUrl: './cash-desk.component.html',
    styleUrls: ['cash-desk.css']
})
export class CashDeskComponent implements OnInit {

    isTesting: boolean;
    account: Account;
    isSaleStarted: boolean;
    products: Array<Product>;
    total: number;
    barcode: string = '';
    changeAmount: string;
    paymentResponse: string;
    cashAmount: string = '';
    cardNumber: string = '';
    pin: string = '';

    //result variables
    updateStockResult: string = '';
    getProductResult: string = '';
    verifyItemResult: string = '';
    removeProductResult: string = '';
    validateCardResult: string = '';


    constructor(private principal: Principal, private eventManager: JhiEventManager, private cashDeskService: CashDeskService) {
     this.init();
    }

    init(){
        this.total = 0;
        this.products = [];
        this.calculateTotal();
        this.isTesting = false;
        this.changeAmount = '';
        this.cashAmount = '';
        this.pin = '';
        this.cardNumber = '';
        this.barcode = '';
    }

    calculateTotal() {
        this.total = 0;
        this.products.forEach((product) => {
            this.total = this.total + product.price;
        });
    }

    startNewSale() {
        this.isSaleStarted = true;
        this.init();
    }

    endSale() {
        this.isSaleStarted = false;
    }

    enterItemIdentifier() {
        this.getProduct(this.barcode);
    }

    cashPayment() {
        this.changeAmount = (+this.cashAmount - this.total).toString();
        //update stock
    }

//============CARD READER CONTROLLER==============================

    cardPayment()
    {
        this.cashDeskService.validateCard(this.cardNumber, this.pin).subscribe((result) => {

            if (result.body === true)
            {
                //if card is valid
                this.validateCardResult = 'Card valid';

                //debit the card

                this.cashDeskService.debitCard(this.total, this.cardNumber).subscribe((result) => {
                    if (result.body)
                    {
                        //if the debit exists
                        this.paymentResponse = 'Payment approved';
                    } else {
                        //if answer is false
                        this.paymentResponse = 'Payment declined';
                    }
                });

            }

            else
                {
                //if answer is false
                this.validateCardResult = 'Card invalid';
                }
        });
    }


    //daca as avea doar 6 admitted barcodes intre 100000000000 si 100000000005

//============SCANNER CONTROLLER==============================
    scanItem() {
        let barcode = Math.floor(Math.random() * (100000000005 - 100000000000 + 1) + 100000000000);
        this.getProduct(barcode.toString());
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

//============INVENTORY CONTROLLER==============================

    updateStock() {
        let id = 12201;
        let amount = 3;

        this.cashDeskService.updateStock(id, amount).subscribe((result) => {
            if (result.body === true) {
                //if answer is true
                this.updateStockResult = "Stock Updated";
            } else {
                //if answer is false
                this.updateStockResult = 'Stock not updated';
            }
        });

    }

    getProduct(barcode) {
        this.cashDeskService.getProduct(barcode).subscribe((result) => {
                if (result.body) {
                    this.products.push(result.body);
                    this.calculateTotal();
                }
                else
                    this.getProductResult = "product doesn't exist";

            },
            (error) => {
                this.getProductResult = "product doesn't exist";
            });
    }

    verifyItem() {

        let id = 12201;

        this.cashDeskService.verifyItem(id).subscribe((result) => {
            if (result.body === false) {
                //if barcode doesn't exist
                this.verifyItemResult = "Barcode invalid";
            } else {
                //if barcode exists
                this.verifyItemResult = "Barcode valid";
            }
        });

    }

    removeProduct() {
        let id = 12201;

        this.cashDeskService.removeProduct(id).subscribe((result) => {
            if (result.body === false) {
                //if product doesn't exist
                this.removeProductResult = 'Could not remove product';
            } else {
                //if product exists
                this.removeProductResult = 'Product removed from stock';
            }
        });
    }

    //USELESS
    verifyProductStock() {
        let id = 12201;

        this.cashDeskService.verifyProductStock(id).subscribe((result) => {
            if (result.body === false) {
                //if prod does not exist
                this.updateStockResult = 'does not exist';
            } else {
                //if prod exists
                this.updateStockResult = 'it exists';
            }
        });

    }

    //============PRINTER CONTROLLER==============================
    printReceipt() {
    }
}
