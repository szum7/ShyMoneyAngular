import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class GlobalService {

    constructor() {
    }

    ToSimpleDate(val: any): string {
        return val.substr(0, 10);
    }

    GetColourOpacity(val: any, maxValue: any, forceNegative?: boolean): string {

        val = parseInt(val);
        maxValue = parseInt(maxValue);

        if (maxValue > 0 && val != 0) {
            let colour, percent;

            percent = Math.abs(val) / maxValue;

            if (val < 0 || (forceNegative)) {
                colour = "rgba(214, 53, 53,";
            } else {
                colour = "rgba(109, 204, 51,";
            }

            return colour + percent + ")";
        } else {
            return "rgb(250,250,250)";
        }
    }

    GetColourValue(val: any, maxValue: any, forceNegative?: boolean): string {

        val = parseInt(val);
        maxValue = parseInt(maxValue);

        if (val == 0) {
            return "rgb(250,250,250)";
        } else {
            let c1, c2, c3, percent;

            if (val < 0 || (forceNegative)) {
                c1 = 220;
                c2 = 0;
                c3 = 0;
                if (maxValue > 0) {
                    percent = Math.abs(val) / maxValue;
                    if (percent <= 1) {
                        c2 = c1 - (c1 * percent);
                        c3 = c2;
                    }
                }
            } else {
                c1 = 0;
                c2 = 220;
                c3 = 0;
                if (maxValue > 0) {
                    percent = val / maxValue;
                    if (percent <= 1) {
                        c1 = c2 - (c2 * percent);
                        c3 = c1;
                    }
                }
            }

            return "rgb(" + c1 + "," + c2 + "," + c3 + ")";
        }
    }

    AddThousandPoints(val: any): string {
        val = val + "";
        var l_Sign = "";
        if (val.charAt(0) == "-") {
            l_Sign = "-";
            val = val.substr(1);
        }
        var l_Ret = "";
        var j = 1;
        for (var i = val.length - 1; i >= 0; i--) {
            l_Ret = val.charAt(i) + l_Ret;
            if (j % 3 == 0 && i != 0) {
                l_Ret = "," + l_Ret;
            }
            j++;
        }
        return l_Sign + l_Ret;
    }
}