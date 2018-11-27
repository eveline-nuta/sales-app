import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesAppSharedModule } from 'app/shared';
import { CashDeskComponent, CASH_DESK_ROUTE} from './';

@NgModule({
    imports: [SalesAppSharedModule, RouterModule.forChild([CASH_DESK_ROUTE])],
    declarations: [CashDeskComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CashDeskModule {}
