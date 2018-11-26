import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StockItem } from 'app/shared/model/stock-item.model';
import { StockItemService } from './stock-item.service';
import { StockItemComponent } from './stock-item.component';
import { StockItemDetailComponent } from './stock-item-detail.component';
import { StockItemUpdateComponent } from './stock-item-update.component';
import { StockItemDeletePopupComponent } from './stock-item-delete-dialog.component';
import { IStockItem } from 'app/shared/model/stock-item.model';

@Injectable({ providedIn: 'root' })
export class StockItemResolve implements Resolve<IStockItem> {
    constructor(private service: StockItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((stockItem: HttpResponse<StockItem>) => stockItem.body));
        }
        return of(new StockItem());
    }
}

export const stockItemRoute: Routes = [
    {
        path: 'stock-item',
        component: StockItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StockItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stock-item/:id/view',
        component: StockItemDetailComponent,
        resolve: {
            stockItem: StockItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StockItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stock-item/new',
        component: StockItemUpdateComponent,
        resolve: {
            stockItem: StockItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StockItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stock-item/:id/edit',
        component: StockItemUpdateComponent,
        resolve: {
            stockItem: StockItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StockItems'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stockItemPopupRoute: Routes = [
    {
        path: 'stock-item/:id/delete',
        component: StockItemDeletePopupComponent,
        resolve: {
            stockItem: StockItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StockItems'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
