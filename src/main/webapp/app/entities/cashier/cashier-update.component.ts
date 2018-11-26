import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICashier } from 'app/shared/model/cashier.model';
import { CashierService } from './cashier.service';

@Component({
    selector: 'jhi-cashier-update',
    templateUrl: './cashier-update.component.html'
})
export class CashierUpdateComponent implements OnInit {
    cashier: ICashier;
    isSaving: boolean;

    constructor(private cashierService: CashierService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cashier }) => {
            this.cashier = cashier;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cashier.id !== undefined) {
            this.subscribeToSaveResponse(this.cashierService.update(this.cashier));
        } else {
            this.subscribeToSaveResponse(this.cashierService.create(this.cashier));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICashier>>) {
        result.subscribe((res: HttpResponse<ICashier>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
