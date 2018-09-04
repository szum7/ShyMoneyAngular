// Core modules
import { Component, OnInit, HostListener } from '@angular/core';

// Services
import { GlobalService, CalculationService } from '../../services/index';

// Addons


// Models


// Core


@Component({
    selector: 'MonthlyResult',
    templateUrl: './monthlyresults.page.html',
    styleUrls: ['./monthlyresults.page.css']
})
export class MonthlyResultPage implements OnInit {

    public monthlyResults: any;

    constructor(
        private calculationService: CalculationService,
        public gl: GlobalService) {

        this.monthlyResults = [];
    }

    ngOnInit(): void {
        let _this = this;

        _this.loadMonthlySumups(function () {

        }); 
    }

    ToggleSums(monthlyResult: any): void {
        if (typeof monthlyResult.isSumsOpen === 'undefined' || !monthlyResult.isSumsOpen) {
            monthlyResult.isSumsOpen = true;
        } else {
            monthlyResult.isSumsOpen = false;
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