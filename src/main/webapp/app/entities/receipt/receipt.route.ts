import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Receipt } from 'app/shared/model/receipt.model';
import { ReceiptService } from './receipt.service';
import { ReceiptComponent } from './receipt.component';
import { ReceiptDetailComponent } from './receipt-detail.component';
import { ReceiptUpdateComponent } from './receipt-update.component';
import { ReceiptDeletePopupComponent } from './receipt-delete-dialog.component';
import { IReceipt } from 'app/shared/model/receipt.model';

@Injectable({ providedIn: 'root' })
export class ReceiptResolve implements Resolve<IReceipt> {
    constructor(private service: ReceiptService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((receipt: HttpResponse<Receipt>) => receipt.body));
        }
        return of(new Receipt());
    }
}

export const receiptRoute: Routes = [
    {
        path: 'receipt',
        component: ReceiptComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receipts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receipt/:id/view',
        component: ReceiptDetailComponent,
        resolve: {
            receipt: ReceiptResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receipts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receipt/new',
        component: ReceiptUpdateComponent,
        resolve: {
            receipt: ReceiptResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receipts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receipt/:id/edit',
        component: ReceiptUpdateComponent,
        resolve: {
            receipt: ReceiptResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receipts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receiptPopupRoute: Routes = [
    {
        path: 'receipt/:id/delete',
        component: ReceiptDeletePopupComponent,
        resolve: {
            receipt: ReceiptResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receipts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
