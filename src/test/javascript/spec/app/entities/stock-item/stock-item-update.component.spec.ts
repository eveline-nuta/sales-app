/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SalesAppTestModule } from '../../../test.module';
import { StockItemUpdateComponent } from 'app/entities/stock-item/stock-item-update.component';
import { StockItemService } from 'app/entities/stock-item/stock-item.service';
import { StockItem } from 'app/shared/model/stock-item.model';

describe('Component Tests', () => {
    describe('StockItem Management Update Component', () => {
        let comp: StockItemUpdateComponent;
        let fixture: ComponentFixture<StockItemUpdateComponent>;
        let service: StockItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [StockItemUpdateComponent]
            })
                .overrideTemplate(StockItemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StockItemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockItemService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StockItem(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stockItem = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StockItem();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stockItem = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
