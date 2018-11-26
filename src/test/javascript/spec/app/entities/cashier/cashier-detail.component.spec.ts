/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalesAppTestModule } from '../../../test.module';
import { CashierDetailComponent } from 'app/entities/cashier/cashier-detail.component';
import { Cashier } from 'app/shared/model/cashier.model';

describe('Component Tests', () => {
    describe('Cashier Management Detail Component', () => {
        let comp: CashierDetailComponent;
        let fixture: ComponentFixture<CashierDetailComponent>;
        const route = ({ data: of({ cashier: new Cashier(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [CashierDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CashierDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CashierDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cashier).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
