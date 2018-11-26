import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICashier } from 'app/shared/model/cashier.model';

type EntityResponseType = HttpResponse<ICashier>;
type EntityArrayResponseType = HttpResponse<ICashier[]>;

@Injectable({ providedIn: 'root' })
export class CashierService {
    public resourceUrl = SERVER_API_URL + 'api/cashiers';

    constructor(private http: HttpClient) {}

    create(cashier: ICashier): Observable<EntityResponseType> {
        return this.http.post<ICashier>(this.resourceUrl, cashier, { observe: 'response' });
    }

    update(cashier: ICashier): Observable<EntityResponseType> {
        return this.http.put<ICashier>(this.resourceUrl, cashier, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICashier>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICashier[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
