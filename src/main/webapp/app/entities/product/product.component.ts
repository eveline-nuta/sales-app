import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProduct } from 'app/shared/model/product.model';
import { Principal } from 'app/core';
import { ProductService } from './product.service';

@Component({
    selector: 'jhi-product',
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, OnDestroy {
    products: IProduct[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private productService: ProductService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.productService.query().subscribe(
            (res: HttpResponse<IProduct[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProduct) {
        return item.id;
    }

    registerChangeInProducts() {
        this.eventSubscriber = this.eventManager.subscribe('productListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
