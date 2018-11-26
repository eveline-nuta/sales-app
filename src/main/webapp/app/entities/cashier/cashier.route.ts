import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cashier } from 'app/shared/model/cashier.model';
import { CashierService } from './cashier.service';
import { CashierComponent } from './cashier.component';
import { CashierDetailComponent } from './cashier-detail.component';
import { CashierUpdateComponent } from './cashier-update.component';
import { CashierDeletePopupComponent } from './cashier-delete-dialog.component';
import { ICashier } from 'app/shared/model/cashier.model';

@Injectable({ providedIn: 'root' })
export class CashierResolve implements Resolve<ICashier> {
    constructor(private service: CashierService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((cashier: HttpResponse<Cashier>) => cashier.body));
        }
        return of(new Cashier());
    }
}

export const cashierRoute: Routes = [
    {
        path: 'cashier',
        component: CashierComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cashiers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cashier/:id/view',
        component: CashierDetailComponent,
        resolve: {
            cashier: CashierResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cashiers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cashier/new',
        component: CashierUpdateComponent,
        resolve: {
            cashier: CashierResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cashiers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cashier/:id/edit',
        component: CashierUpdateComponent,
        resolve: {
            cashier: CashierResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cashiers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cashierPopupRoute: Routes = [
    {
        path: 'cashier/:id/delete',
        component: CashierDeletePopupComponent,
        resolve: {
            cashier: CashierResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cashiers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
