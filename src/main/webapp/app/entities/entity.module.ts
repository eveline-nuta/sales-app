import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SalesAppCashierModule } from './cashier/cashier.module';
import { SalesAppStockItemModule } from './stock-item/stock-item.module';
import { SalesAppProductModule } from './product/product.module';
import { SalesAppReceiptModule } from './receipt/receipt.module';
import { SalesAppDebitModule } from './debit/debit.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SalesAppCashierModule,
        SalesAppStockItemModule,
        SalesAppProductModule,
        SalesAppReceiptModule,
        SalesAppDebitModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesAppEntityModule {}
