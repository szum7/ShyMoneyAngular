// Core modules
import { Component, OnInit, HostListener } from '@angular/core';

// Services
import { CalculationService, GlobalService } from '../../services/index';

// Addons


// Models


// Core


@Component({
    selector: 'TagTotalResult',
    templateUrl: './tagtotalresult.page.html',
    styleUrls: ['./tagtotalresult.page.css']
})
export class TagTotalResultPage implements OnInit {
    
    public tagTotalResults: any;

    constructor(
        private calculationService: CalculationService, 
        public gl: GlobalService) {

        this.tagTotalResults = [];
    }

    ngOnInit(): void {
        let _this = this;

        _this.loadData(function () {

        });
    }


    /**
     * Loaders
     */

    private loadData(callback: Function): void {
        callback = (typeof callback === 'undefined') ? (function () { }) : callback;

        let _this = this;

        this.calculationService.getTagTotalResult(2010, 1, 1, 2018, 9, 1).subscribe(function (response) {
            console.log(response);
            _this.tagTotalResults = response;

            // END
            callback();
        });
    }
}