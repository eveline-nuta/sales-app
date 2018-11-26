/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SalesAppTestModule } from '../../../test.module';
import { DebitUpdateComponent } from 'app/entities/debit/debit-update.component';
import { DebitService } from 'app/entities/debit/debit.service';
import { Debit } from 'app/shared/model/debit.model';

describe('Component Tests', () => {
    describe('Debit Management Update Component', () => {
        let comp: DebitUpdateComponent;
        let fixture: ComponentFixture<DebitUpdateComponent>;
        let service: DebitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [DebitUpdateComponent]
            })
                .overrideTemplate(DebitUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DebitUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DebitService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Debit(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.debit = entity;
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
                    const entity = new Debit();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.debit = entity;
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
