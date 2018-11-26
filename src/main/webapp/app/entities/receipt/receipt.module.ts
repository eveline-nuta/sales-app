import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesAppSharedModule } from 'app/shared';
import {
    ReceiptComponent,
    ReceiptDetailComponent,
    ReceiptUpdateComponent,
    ReceiptDeletePopupComponent,
    ReceiptDeleteDialogComponent,
    receiptRoute,
    receiptPopupRoute
} from './';

const ENTITY_STATES = [...receiptRoute, ...receiptPopupRoute];

@NgModule({
    imports: [SalesAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReceiptComponent,
        ReceiptDetailComponent,
        ReceiptUpdateComponent,
        ReceiptDeleteDialogComponent,
        ReceiptDeletePopupComponent
    ],
    entryComponents: [ReceiptComponent, ReceiptUpdateComponent, ReceiptDeleteDialogComponent, ReceiptDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesAppReceiptModule {}
