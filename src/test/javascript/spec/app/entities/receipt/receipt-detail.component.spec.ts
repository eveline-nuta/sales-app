/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalesAppTestModule } from '../../../test.module';
import { ReceiptDetailComponent } from 'app/entities/receipt/receipt-detail.component';
import { Receipt } from 'app/shared/model/receipt.model';

describe('Component Tests', () => {
    describe('Receipt Management Detail Component', () => {
        let comp: ReceiptDetailComponent;
        let fixture: ComponentFixture<ReceiptDetailComponent>;
        const route = ({ data: of({ receipt: new Receipt(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [ReceiptDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReceiptDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceiptDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.receipt).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
