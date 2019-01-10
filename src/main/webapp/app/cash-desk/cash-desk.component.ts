import {Component, OnInit} from '@angular/core';
import {Account, Principal} from "app/core";
import {JhiEventManager} from "ng-jhipster";
import {Product} from "app/shared/model/product.model";
import {CashDeskService} from "app/cash-desk/cash-desk.service";
3

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
    cashPaymentResult: string='';
    cardPaymentResult: string='';
    enterItemIdentifierResult='';


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
        this.updateStockResult= '';
       this.getProductResult= '';
       this.verifyItemResult = '';
       this.removeProductResult = '';
       this.validateCardResult = '';
       this.cashPaymentResult='';
       this.cardPaymentResult='';
       this.paymentResponse='';
       this.enterItemIdentifierResult='';
    }

    emptyCart()
    {
        this.total = 0;
        this.products = [];
        this.calculateTotal();
        this.isTesting = false;
        this.cashAmount = '';
        this.pin = '';
        this.cardNumber = '';
        this.barcode = '';
        this.enterItemIdentifierResult='';
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
        this.cashDeskService.verifyProductStock(this.barcode.toString()).subscribe((result) => {
            if (result.body) {
                this.getProduct(this.barcode);
                this.enterItemIdentifierResult='Product added to cart';
            } else {
                this.enterItemIdentifierResult='Product not on stock';
            }
        },(error) => {
            this.enterItemIdentifierResult = 'Product does not exist';
        });
    }

    cashPayment()
    {
        let rest=+this.cashAmount - this.total
        this.changeAmount = rest.toString();

         if (rest>=0)
         {
             let grouped = this.groupBy(this.products, product => product.id);
             grouped.forEach((value: Array<Product>, key: number) => {
                 this.updateStock(key, value.length);
             });

             this.cashPaymentResult='Cash Payment successful';
             this.emptyCart();
         }

         else this.cashPaymentResult='Not enough cash';

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

                        if(result.body.status===true)
                        {
                            this.paymentResponse = 'Payment approved';

                            let grouped = this.groupBy(this.products, product => product.id);
                            grouped.forEach((value: Array<Product>, key: number) => {
                                this.updateStock(key, value.length);
                            });
                            this.cardPaymentResult = 'Card Payment successful';
                            this.emptyCart();

                        }else {
                            this.paymentResponse = 'Not enough money, payment declined';
                            this.cardPaymentResult = 'Card Payment unsuccessful';

                        }


                    } else {
                        //if answer is false
                        this.paymentResponse = 'Payment declined';
                        this.cardPaymentResult = 'Card Payment unsuccessful';
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

    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach(item => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }
    //daca as avea doar 6 admitted barcodes intre 100000000000 si 100000000005

//============SCANNER CONTROLLER==============================
    //get a random barcode from a product and add it to the cart if it is on stock
    scanItem()
    {
        let barcode = Math.floor(Math.random() * (100000000006 - 100000000000 + 1) + 100000000000);
        this.cashDeskService.verifyProductStock(barcode.toString()).subscribe((result) => {
        if (result.body) {
            this.getProduct(barcode.toString());
        } else {
            return false;
        }
    });
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

    updateStock(productId: number,amount: number) {

        this.cashDeskService.updateStock(productId, amount).subscribe((result) => {
            if (result.body === true) {
                //if answer is true
                this.updateStockResult = "Stock updated";
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

    verifyItem(id) {

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

    removeProduct(id) {

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

    //============PRINTER CONTROLLER==============================
    printReceipt() {
    }
}
