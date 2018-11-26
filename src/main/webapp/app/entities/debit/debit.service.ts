import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDebit } from 'app/shared/model/debit.model';

type EntityResponseType = HttpResponse<IDebit>;
type EntityArrayResponseType = HttpResponse<IDebit[]>;

@Injectable({ providedIn: 'root' })
export class DebitService {
    public resourceUrl = SERVER_API_URL + 'api/debits';

    constructor(private http: HttpClient) {}

    create(debit: IDebit): Observable<EntityResponseType> {
        return this.http.post<IDebit>(this.resourceUrl, debit, { observe: 'response' });
    }

    update(debit: IDebit): Observable<EntityResponseType> {
        return this.http.put<IDebit>(this.resourceUrl, debit, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDebit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDebit[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
