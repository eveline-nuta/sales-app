import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IReceipt } from 'app/shared/model/receipt.model';
import { ReceiptService } from './receipt.service';

@Component({
    selector: 'jhi-receipt-update',
    templateUrl: './receipt-update.component.html'
})
export class ReceiptUpdateComponent implements OnInit {
    receipt: IReceipt;
    isSaving: boolean;

    constructor(private receiptService: ReceiptService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ receipt }) => {
            this.receipt = receipt;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.receipt.id !== undefined) {
            this.subscribeToSaveResponse(this.receiptService.update(this.receipt));
        } else {
            this.subscribeToSaveResponse(this.receiptService.create(this.receipt));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReceipt>>) {
        result.subscribe((res: HttpResponse<IReceipt>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
