import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReceipt } from 'app/shared/model/receipt.model';

@Component({
    selector: 'jhi-receipt-detail',
    templateUrl: './receipt-detail.component.html'
})
export class ReceiptDetailComponent implements OnInit {
    receipt: IReceipt;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receipt }) => {
            this.receipt = receipt;
        });
    }

    previousState() {
        window.history.back();
    }
}
