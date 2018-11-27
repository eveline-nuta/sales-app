import { Route } from '@angular/router';

import { CashDeskComponent } from './';

export const CASH_DESK_ROUTE: Route = {
    path: 'cash-desk',
    component: CashDeskComponent,
    data: {
        pageTitle: 'Welcome, Java Hipster!'
    }
};
