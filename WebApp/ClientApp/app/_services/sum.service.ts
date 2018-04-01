import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

import { SumModel } from './../global/summodel';

@Injectable()
export class SumService {

    constructor(private http: Http) {
    }

    getOnDates(dateType: string, FROM_DATE?: Date, TO_DATE?: Date) {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");

        var url = "/Sum/GetOnDates";
        url += "?dateType=" + dateType;
        if (FROM_DATE != null) {
            url += "&";
            url += "FROM_DATE=" + FROM_DATE.toJSON();
        }
        if (TO_DATE != null) {
            url += "&";
            url += "TO_DATE=" + TO_DATE.toJSON();
        }

        return this.http.get(url, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    get(FROM_DATE?: Date, TO_DATE?: Date) {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");

        var url = "/Sum/GetWithTags";
        if (FROM_DATE != null) {
            url += "?";
            url += "FROM_DATE=" + FROM_DATE.toJSON();
        }
        if (TO_DATE != null) {
            url += "&";
            url += "TO_DATE=" + TO_DATE.toJSON();
        }

        return this.http.get(url, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    save(SUM: SumModel): Observable<SumModel> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(SUM);

        return this.http.post("/Sum/Save/", body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    delete(ID: number): Observable<string> {
        return this.http.delete("/Sum/Delete/" + ID)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }

}