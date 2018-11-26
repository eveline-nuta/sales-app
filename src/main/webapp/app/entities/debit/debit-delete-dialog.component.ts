import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDebit } from 'app/shared/model/debit.model';
import { DebitService } from './debit.service';

@Component({
    selector: 'jhi-debit-delete-dialog',
    templateUrl: './debit-delete-dialog.component.html'
})
export class DebitDeleteDialogComponent {
    debit: IDebit;

    constructor(private debitService: DebitService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.debitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'debitListModification',
                content: 'Deleted an debit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-debit-delete-popup',
    template: ''
})
export class DebitDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ debit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DebitDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.debit = debit;
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
