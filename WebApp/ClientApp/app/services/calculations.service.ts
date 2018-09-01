import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

import { MonthlyResult } from './models/MonthlyResult';

@Injectable()
export class CalculationService {

    constructor(private http: Http) {
    }

    getMonthlySumups(FROM_YEAR: number, FROM_MONTH: number, TO_YEAR: number, TO_MONTH: number) {

        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");

        var url = "/Calculations/GetMonthlySumups";
        url += "?FROM_YEAR=" + FROM_YEAR;
        url += "&FROM_MONTH=" + FROM_MONTH;
        url += "&TO_YEAR=" + TO_YEAR;
        url += "&TO_MONTH=" + TO_MONTH;

        console.log(url);

        return this.http.get(url, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    getFakeMonthlySumups(FROM_YEAR: number, FROM_MONTH: number, TO_YEAR: number, TO_MONTH: number) {

        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");

        var url = "/Calculations/GetFakeMonthlySumups";
        url += "?FROM_YEAR=" + FROM_YEAR;
        url += "&FROM_MONTH=" + FROM_MONTH;
        url += "&TO_YEAR=" + TO_YEAR;
        url += "&TO_MONTH=" + TO_MONTH;

        console.log(url);

        return this.http.get(url, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }
}