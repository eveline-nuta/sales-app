import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDebit } from 'app/shared/model/debit.model';
import { Principal } from 'app/core';
import { DebitService } from './debit.service';

@Component({
    selector: 'jhi-debit',
    templateUrl: './debit.component.html'
})
export class DebitComponent implements OnInit, OnDestroy {
    debits: IDebit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private debitService: DebitService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.debitService.query().subscribe(
            (res: HttpResponse<IDebit[]>) => {
                this.debits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDebits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDebit) {
        return item.id;
    }

    registerChangeInDebits() {
        this.eventSubscriber = this.eventManager.subscribe('debitListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
