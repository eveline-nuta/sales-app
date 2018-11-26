import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Debit } from 'app/shared/model/debit.model';
import { DebitService } from './debit.service';
import { DebitComponent } from './debit.component';
import { DebitDetailComponent } from './debit-detail.component';
import { DebitUpdateComponent } from './debit-update.component';
import { DebitDeletePopupComponent } from './debit-delete-dialog.component';
import { IDebit } from 'app/shared/model/debit.model';

@Injectable({ providedIn: 'root' })
export class DebitResolve implements Resolve<IDebit> {
    constructor(private service: DebitService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((debit: HttpResponse<Debit>) => debit.body));
        }
        return of(new Debit());
    }
}

export const debitRoute: Routes = [
    {
        path: 'debit',
        component: DebitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Debits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'debit/:id/view',
        component: DebitDetailComponent,
        resolve: {
            debit: DebitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Debits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'debit/new',
        component: DebitUpdateComponent,
        resolve: {
            debit: DebitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Debits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'debit/:id/edit',
        component: DebitUpdateComponent,
        resolve: {
            debit: DebitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Debits'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const debitPopupRoute: Routes = [
    {
        path: 'debit/:id/delete',
        component: DebitDeletePopupComponent,
        resolve: {
            debit: DebitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Debits'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
