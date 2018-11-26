import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesAppSharedModule } from 'app/shared';
import {
    DebitComponent,
    DebitDetailComponent,
    DebitUpdateComponent,
    DebitDeletePopupComponent,
    DebitDeleteDialogComponent,
    debitRoute,
    debitPopupRoute
} from './';

const ENTITY_STATES = [...debitRoute, ...debitPopupRoute];

@NgModule({
    imports: [SalesAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [DebitComponent, DebitDetailComponent, DebitUpdateComponent, DebitDeleteDialogComponent, DebitDeletePopupComponent],
    entryComponents: [DebitComponent, DebitUpdateComponent, DebitDeleteDialogComponent, DebitDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesAppDebitModule {}
