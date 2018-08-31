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

    constructor(
        private calculationService: CalculationService) {

    }

    ngOnInit(): void {
        let _this = this;

        _this.loadMonthlySumups(function () {
            
        }); 
    }

    /**
     * Loaders
     */

    private loadMonthlySumups(callback: Function): void {
        callback = (typeof callback === 'undefined') ? (function () { }) : callback;

        let _this = this;

        this.calculationService.getMonthlySumups(2018, 1, 2018, 8).subscribe(function (response) {
            console.log(response);

            // END
            callback();
        });
    }
}