import { NgModule } from '@angular/core';

import { SalesAppSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SalesAppSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SalesAppSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SalesAppSharedCommonModule {}
