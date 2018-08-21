import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

import { IntellisenseModel } from './../global/intellisensemodel';

class IntellWrap{
    dateType: string;
    data: Array<IntellisenseModel>;

    constructor(){
        this.dateType = "";
        this.data = [];
    }
}

@Injectable()
export class IntellisenseService {

    constructor(private http: Http) {
    }

    get() {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");

        var url = "/Intellisense/Get";

        return this.http.get(url, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    save(INTELLISENSE: IntellisenseModel): Observable<IntellisenseModel> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(INTELLISENSE);

        return this.http.post("/Intellisense/Save/", body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    delete(ID: number): Observable<string> {
        return this.http.delete("/Intellisense/Delete/" + ID)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }

}