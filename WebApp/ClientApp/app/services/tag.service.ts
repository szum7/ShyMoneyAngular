import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

import { TagModel } from './../global/tagmodel';

@Injectable()
export class TagService {

    constructor(private http: Http) {
    }

    get() {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");

        var url = "/Tag/Get";

        return this.http.get(url, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    save(MODEL: TagModel): Observable<TagModel> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(MODEL);

        return this.http.post("/Tag/Save/", body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    delete(ID: number): Observable<string> {
        return this.http.delete("/Tag/Delete/" + ID)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }

}