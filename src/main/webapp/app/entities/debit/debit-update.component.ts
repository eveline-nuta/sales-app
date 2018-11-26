import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDebit } from 'app/shared/model/debit.model';
import { DebitService } from './debit.service';

@Component({
    selector: 'jhi-debit-update',
    templateUrl: './debit-update.component.html'
})
export class DebitUpdateComponent implements OnInit {
    debit: IDebit;
    isSaving: boolean;

    constructor(private debitService: DebitService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ debit }) => {
            this.debit = debit;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.debit.id !== undefined) {
            this.subscribeToSaveResponse(this.debitService.update(this.debit));
        } else {
            this.subscribeToSaveResponse(this.debitService.create(this.debit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDebit>>) {
        result.subscribe((res: HttpResponse<IDebit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
