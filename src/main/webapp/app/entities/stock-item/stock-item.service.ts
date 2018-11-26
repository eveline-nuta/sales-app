import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStockItem } from 'app/shared/model/stock-item.model';

type EntityResponseType = HttpResponse<IStockItem>;
type EntityArrayResponseType = HttpResponse<IStockItem[]>;

@Injectable({ providedIn: 'root' })
export class StockItemService {
    public resourceUrl = SERVER_API_URL + 'api/stock-items';

    constructor(private http: HttpClient) {}

    create(stockItem: IStockItem): Observable<EntityResponseType> {
        return this.http.post<IStockItem>(this.resourceUrl, stockItem, { observe: 'response' });
    }

    update(stockItem: IStockItem): Observable<EntityResponseType> {
        return this.http.put<IStockItem>(this.resourceUrl, stockItem, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStockItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStockItem[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
