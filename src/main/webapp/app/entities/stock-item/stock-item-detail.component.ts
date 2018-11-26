import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStockItem } from 'app/shared/model/stock-item.model';

@Component({
    selector: 'jhi-stock-item-detail',
    templateUrl: './stock-item-detail.component.html'
})
export class StockItemDetailComponent implements OnInit {
    stockItem: IStockItem;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stockItem }) => {
            this.stockItem = stockItem;
        });
    }

    previousState() {
        window.history.back();
    }
}
