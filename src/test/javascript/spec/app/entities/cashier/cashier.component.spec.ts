/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SalesAppTestModule } from '../../../test.module';
import { CashierComponent } from 'app/entities/cashier/cashier.component';
import { CashierService } from 'app/entities/cashier/cashier.service';
import { Cashier } from 'app/shared/model/cashier.model';

describe('Component Tests', () => {
    describe('Cashier Management Component', () => {
        let comp: CashierComponent;
        let fixture: ComponentFixture<CashierComponent>;
        let service: CashierService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [CashierComponent],
                providers: []
            })
                .overrideTemplate(CashierComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CashierComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashierService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Cashier(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cashiers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
