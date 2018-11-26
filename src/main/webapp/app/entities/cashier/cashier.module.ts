import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesAppSharedModule } from 'app/shared';
import {
    CashierComponent,
    CashierDetailComponent,
    CashierUpdateComponent,
    CashierDeletePopupComponent,
    CashierDeleteDialogComponent,
    cashierRoute,
    cashierPopupRoute
} from './';

const ENTITY_STATES = [...cashierRoute, ...cashierPopupRoute];

@NgModule({
    imports: [SalesAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CashierComponent,
        CashierDetailComponent,
        CashierUpdateComponent,
        CashierDeleteDialogComponent,
        CashierDeletePopupComponent
    ],
    entryComponents: [CashierComponent, CashierUpdateComponent, CashierDeleteDialogComponent, CashierDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesAppCashierModule {}
