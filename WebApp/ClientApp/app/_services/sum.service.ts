import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ISum } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class SumService {

    private _getSumsUrl = "/Sum/GetSums";
    public _saveUrl: string = '/Sum/SaveSum/';
    public _updateUrl: string = '/Sum/UpdateSum/';
    public _deleteByIdUrl: string = '/Sum/DeleteSumByID/';

    constructor(private http: Http) { }

    getSumsSync() {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");
        return this.http.get("/Sum/GetSumsSync", { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    getSums() {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");
        var getSumsUrl = this._getSumsUrl;
        return this.http.get(getSumsUrl, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    //Post Savd and Update operation
    saveSum(sum: ISum): Observable<string> {
        let body = JSON.stringify(sum);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._saveUrl, body, options)
            .map(res => res.json().message)
            .catch(this.handleError);
    }

    //Delete Operation
    deleteSum(id: number): Observable<string> {
        //debugger
        var deleteByIdUrl = this._deleteByIdUrl + '/' + id

        return this.http.delete(deleteByIdUrl)
            .map(response => response.json().message)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }

}