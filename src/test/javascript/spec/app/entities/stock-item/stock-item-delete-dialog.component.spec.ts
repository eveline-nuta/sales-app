/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SalesAppTestModule } from '../../../test.module';
import { StockItemDeleteDialogComponent } from 'app/entities/stock-item/stock-item-delete-dialog.component';
import { StockItemService } from 'app/entities/stock-item/stock-item.service';

describe('Component Tests', () => {
    describe('StockItem Management Delete Component', () => {
        let comp: StockItemDeleteDialogComponent;
        let fixture: ComponentFixture<StockItemDeleteDialogComponent>;
        let service: StockItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [StockItemDeleteDialogComponent]
            })
                .overrideTemplate(StockItemDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StockItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockItemService);
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
