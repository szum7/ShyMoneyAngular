// Core modules
import { Component, OnInit, HostListener } from '@angular/core';

// Services
import { CalculationService } from '../../services/index';

// Addons


// Models


// Core


@Component({
    selector: 'CalculationsPage',
    templateUrl: './calculations.page.html',
    styleUrls: ['./calculations.page.css']
})
export class CalculationsPage implements OnInit {

    public monthlyResults: any;

    private _maxValue: number;

    constructor(
        private calculationService: CalculationService) {

        this._maxValue = 1200000;
    }

    ngOnInit(): void {
        let _this = this;

        _this.loadMonthlySumups(function () {
            //_this.JumbleData(_this.monthlyResults);
        }); 
    }

    JumbleData(arr: any): any {

        var rnd, ifRnd;

        for (var i = 0; i < arr.length; i++) {
            rnd = Math.floor((Math.random() * 50000) + 3000); ifRnd = Math.floor(Math.random() * 2); if (ifRnd == 0) rnd *= -1;
            arr[i].expense = Math.floor((arr[i].expense + rnd) * 100) / 100;
            rnd = Math.floor((Math.random() * 50000) + 3000); ifRnd = Math.floor(Math.random() * 2); if (ifRnd == 0) rnd *= -1;
            arr[i].income = Math.floor((arr[i].income + rnd) * 100) / 100;
            rnd = Math.floor((Math.random() * 50000) + 3000); ifRnd = Math.floor(Math.random() * 2); if (ifRnd == 0) rnd *= -1;
            arr[i].flow = Math.floor((arr[i].flow + rnd) * 100) / 100;
            rnd = Math.floor((Math.random() * 50000) + 3000); ifRnd = Math.floor(Math.random() * 2); if (ifRnd == 0) rnd *= -1;
            arr[i].flowPerDay = Math.floor((arr[i].flowPerDay + rnd) * 100) / 100;
            rnd = Math.floor((Math.random() * 50000) + 3000); ifRnd = Math.floor(Math.random() * 2); if (ifRnd == 0) rnd *= -1;
            arr[i].incomePerDay = Math.floor((arr[i].incomePerDay + rnd) * 100) / 100;
            rnd = Math.floor((Math.random() * 50000) + 3000); ifRnd = Math.floor(Math.random() * 2); if (ifRnd == 0) rnd *= -1;
            arr[i].expensePerDay = Math.floor((arr[i].expensePerDay + rnd) * 100) / 100;
            rnd = Math.floor((Math.random() * 50000) + 3000); ifRnd = Math.floor(Math.random() * 2); if (ifRnd == 0) rnd *= -1;
            arr[i].cumulatedFlow = Math.floor((arr[i].cumulatedFlow + rnd) * 100) / 100;
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

    ToSimpleDate(val: any): string {
        return val.substr(0, 10);
    }

    IsNegative(val: any): boolean {
        let num = parseInt(val);
        if (num < 0)
            return true;
        return false;
    }

    ToggleSums(monthlyResult: any): void {
        if (typeof monthlyResult.isSumsOpen === 'undefined' || !monthlyResult.isSumsOpen) {
            monthlyResult.isSumsOpen = true;
        } else {
            monthlyResult.isSumsOpen = false;
        }
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

    /**
     * Loaders
     */

    private loadMonthlySumups(callback: Function): void {
        callback = (typeof callback === 'undefined') ? (function () { }) : callback;

        let _this = this;

        this.calculationService.getMonthlySumups(2010, 1, 2018, 8).subscribe(function (response) {
            console.log(response);
            _this.monthlyResults = response;

            // END
            callback();
        });
    }
}