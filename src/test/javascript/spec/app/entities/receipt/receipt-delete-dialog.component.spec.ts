/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SalesAppTestModule } from '../../../test.module';
import { ReceiptDeleteDialogComponent } from 'app/entities/receipt/receipt-delete-dialog.component';
import { ReceiptService } from 'app/entities/receipt/receipt.service';

describe('Component Tests', () => {
    describe('Receipt Management Delete Component', () => {
        let comp: ReceiptDeleteDialogComponent;
        let fixture: ComponentFixture<ReceiptDeleteDialogComponent>;
        let service: ReceiptService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [ReceiptDeleteDialogComponent]
            })
                .overrideTemplate(ReceiptDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceiptDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
