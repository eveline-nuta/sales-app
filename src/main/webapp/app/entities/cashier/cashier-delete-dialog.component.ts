import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICashier } from 'app/shared/model/cashier.model';
import { CashierService } from './cashier.service';

@Component({
    selector: 'jhi-cashier-delete-dialog',
    templateUrl: './cashier-delete-dialog.component.html'
})
export class CashierDeleteDialogComponent {
    cashier: ICashier;

    constructor(private cashierService: CashierService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cashierService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cashierListModification',
                content: 'Deleted an cashier'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cashier-delete-popup',
    template: ''
})
export class CashierDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cashier }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CashierDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cashier = cashier;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
