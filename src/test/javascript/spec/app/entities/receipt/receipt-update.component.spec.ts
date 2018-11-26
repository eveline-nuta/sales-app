/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SalesAppTestModule } from '../../../test.module';
import { ReceiptUpdateComponent } from 'app/entities/receipt/receipt-update.component';
import { ReceiptService } from 'app/entities/receipt/receipt.service';
import { Receipt } from 'app/shared/model/receipt.model';

describe('Component Tests', () => {
    describe('Receipt Management Update Component', () => {
        let comp: ReceiptUpdateComponent;
        let fixture: ComponentFixture<ReceiptUpdateComponent>;
        let service: ReceiptService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [ReceiptUpdateComponent]
            })
                .overrideTemplate(ReceiptUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceiptUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Receipt(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receipt = entity;
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
                    const entity = new Receipt();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receipt = entity;
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
