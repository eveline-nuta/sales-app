import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStockItem } from 'app/shared/model/stock-item.model';
import { StockItemService } from './stock-item.service';

@Component({
    selector: 'jhi-stock-item-update',
    templateUrl: './stock-item-update.component.html'
})
export class StockItemUpdateComponent implements OnInit {
    stockItem: IStockItem;
    isSaving: boolean;

    constructor(private stockItemService: StockItemService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stockItem }) => {
            this.stockItem = stockItem;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.stockItem.id !== undefined) {
            this.subscribeToSaveResponse(this.stockItemService.update(this.stockItem));
        } else {
            this.subscribeToSaveResponse(this.stockItemService.create(this.stockItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStockItem>>) {
        result.subscribe((res: HttpResponse<IStockItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
