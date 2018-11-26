import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReceipt } from 'app/shared/model/receipt.model';

type EntityResponseType = HttpResponse<IReceipt>;
type EntityArrayResponseType = HttpResponse<IReceipt[]>;

@Injectable({ providedIn: 'root' })
export class ReceiptService {
    public resourceUrl = SERVER_API_URL + 'api/receipts';

    constructor(private http: HttpClient) {}

    create(receipt: IReceipt): Observable<EntityResponseType> {
        return this.http.post<IReceipt>(this.resourceUrl, receipt, { observe: 'response' });
    }

    update(receipt: IReceipt): Observable<EntityResponseType> {
        return this.http.put<IReceipt>(this.resourceUrl, receipt, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IReceipt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IReceipt[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
