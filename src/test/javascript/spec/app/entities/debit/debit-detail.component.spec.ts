/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalesAppTestModule } from '../../../test.module';
import { DebitDetailComponent } from 'app/entities/debit/debit-detail.component';
import { Debit } from 'app/shared/model/debit.model';

describe('Component Tests', () => {
    describe('Debit Management Detail Component', () => {
        let comp: DebitDetailComponent;
        let fixture: ComponentFixture<DebitDetailComponent>;
        const route = ({ data: of({ debit: new Debit(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesAppTestModule],
                declarations: [DebitDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DebitDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DebitDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.debit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
