/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SalesAppTestModule } from '../../../test.module';
import { DebitComponent } from 'app/entities/debit/debit.component';
import { DebitService } from 'app/entities/debit/debit.service';
import { Debit } from 'app/shared/model/debit.model';

describe('Component Tests', () => {
    describe('Debit Management Component', () => {
        let comp: DebitComponent;
        let fixture: ComponentFixture<DebitComponent>;
        let service: DebitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [DebitComponent],
                providers: []
            })
                .overrideTemplate(DebitComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DebitComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DebitService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Debit(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.debits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
