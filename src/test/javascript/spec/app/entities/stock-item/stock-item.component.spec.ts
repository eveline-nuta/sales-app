/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SalesAppTestModule } from '../../../test.module';
import { StockItemComponent } from 'app/entities/stock-item/stock-item.component';
import { StockItemService } from 'app/entities/stock-item/stock-item.service';
import { StockItem } from 'app/shared/model/stock-item.model';

describe('Component Tests', () => {
    describe('StockItem Management Component', () => {
        let comp: StockItemComponent;
        let fixture: ComponentFixture<StockItemComponent>;
        let service: StockItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [StockItemComponent],
                providers: []
            })
                .overrideTemplate(StockItemComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StockItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockItemService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new StockItem(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.stockItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
