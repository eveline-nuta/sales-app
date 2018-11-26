import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDebit } from 'app/shared/model/debit.model';

@Component({
    selector: 'jhi-debit-detail',
    templateUrl: './debit-detail.component.html'
})
export class DebitDetailComponent implements OnInit {
    debit: IDebit;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ debit }) => {
            this.debit = debit;
        });
    }

    previousState() {
        window.history.back();
    }
}
