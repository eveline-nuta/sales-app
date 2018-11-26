/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SalesAppTestModule } from '../../../test.module';
import { ReceiptComponent } from 'app/entities/receipt/receipt.component';
import { ReceiptService } from 'app/entities/receipt/receipt.service';
import { Receipt } from 'app/shared/model/receipt.model';

describe('Component Tests', () => {
    describe('Receipt Management Component', () => {
        let comp: ReceiptComponent;
        let fixture: ComponentFixture<ReceiptComponent>;
        let service: ReceiptService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [ReceiptComponent],
                providers: []
            })
                .overrideTemplate(ReceiptComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceiptComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Receipt(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.receipts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
