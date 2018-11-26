import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICashier } from 'app/shared/model/cashier.model';

@Component({
    selector: 'jhi-cashier-detail',
    templateUrl: './cashier-detail.component.html'
})
export class CashierDetailComponent implements OnInit {
    cashier: ICashier;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cashier }) => {
            this.cashier = cashier;
        });
    }

    previousState() {
        window.history.back();
    }
}
