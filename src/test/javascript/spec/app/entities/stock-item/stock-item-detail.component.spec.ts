/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalesAppTestModule } from '../../../test.module';
import { StockItemDetailComponent } from 'app/entities/stock-item/stock-item-detail.component';
import { StockItem } from 'app/shared/model/stock-item.model';

describe('Component Tests', () => {
    describe('StockItem Management Detail Component', () => {
        let comp: StockItemDetailComponent;
        let fixture: ComponentFixture<StockItemDetailComponent>;
        const route = ({ data: of({ stockItem: new StockItem(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [StockItemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StockItemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StockItemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stockItem).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
