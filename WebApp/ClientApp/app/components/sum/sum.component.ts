// Core modules
import { Component, OnInit, HostListener } from '@angular/core';
//import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

// Services
import { SumService, IntellisenseService, TagService } from '../../_services/index';

// Addons
import { ToastrService } from 'toastr-ng2';

// Models
import { SumModel } from './../../global/summodel';
import { TagModel } from './../../global/tagmodel';
import { SumsOnDay } from './../../global/sumsonday';
import { SumsOnDayWrap } from './../../global/sumsondaywrap';
import { IntellisenseModel } from './../../global/intellisensemodel';
// export * from './sum.service'; 

// Core
import { Control } from './core/Control';

class Ordering {
    public orderBy?: string;
    public steep?: string;
}

@Component({
    selector: 'sum',
    templateUrl: './sum.component.html',
    styleUrls: ['./sum.component.css']
})
export class SumComponent implements OnInit {

    // Core
    private ctrl: Control;

    // Data holders
    public sumsOnDayWrap: SumsOnDayWrap;
    public intellisenses: Array<IntellisenseModel>;
    public intellisenseResults: Array<IntellisenseModel>;
    public tags: Array<TagModel>;

    // Settings
    public ordering: Ordering;

    // DateRangePicker properties
    public pickDateFromValue: Date;
    public pickDateToValue: Date;
    //public minDate: number = (new Date(2017, 1, 1)).getTime();
    //public maxDate: number = (new Date()).getTime();

    // BEGIN test
    // END test

    constructor(
        private sumService: SumService,
        private intellisenseService: IntellisenseService,
        private tagService: TagService,
        private toastrService: ToastrService) {

        this.ctrl = new Control(this.sumService);

        // TODO megszerezni user beállításaiból adatbázisból

        // Data holders
        this.intellisenses = [];
        this.intellisenseResults = [];
        this.tags = [];
        this.sumsOnDayWrap = new SumsOnDayWrap(); 

        // Settings
        this.ordering = new Ordering();
        this.ordering.orderBy = "INPUT_DATE";        
        this.ordering.steep = "ASC";

        // Init DateRangePicker properties
        var date = new Date();
        this.pickDateFromValue = new Date(2018, 0, 1); //new Date(date.getFullYear() - 1, date.getMonth(), 1);
        this.pickDateToValue = new Date(2018, 2, 14);
    }

    ngOnInit() {
        let _this = this;

        _this.loadIntellisenses(function () {
            _this.loadSums(function () {
                
            });
        }); 

        _this.loadTags(function () {

        });
    }    


    /**
     * Methods
     */

    setSumOnIntellisense(event: IntellisenseModel, sum: SumModel): void {
        if (event.SumSum)
            sum.Sum = event.SumSum;
        if (event.SumTitle)
            sum.Title = event.SumTitle;
        if (event.SumAccountDate)
            sum.AccountDate = event.SumAccountDate;
        if (event.SumDueDate)
            sum.DueDate = event.SumDueDate;
        if (event.SumInputDate)
            sum.InputDate = event.SumInputDate;

        var _this = this;
        sum.Tags = this.tags.filter(a => _this.isInArray(event.Tags, a.Id));
    }

    searchIntellisense(event: any, sum: SumModel): void {
        this.intellisenseResults = [];
        for (var i = 0; i < this.intellisenses.length; i++) {
            let title = this.intellisenses[i].Title.toLowerCase();
            if (title.toLowerCase().includes(event.query.toLowerCase())) {
                this.intellisenseResults.push(this.intellisenses[i]);
            }
        }
    }


    /**
     * Loaders
     */

    private loadIntellisenses(callback: Function): void {
        callback = (typeof callback === 'undefined') ? (function () { }) : callback;

        let _this = this;
        this.intellisenseService.get().subscribe(function (response) {
            console.log(response);
            _this.intellisenses = response;

            // END
            callback();
        });
    }

    private loadSums(callback: Function): void {
        callback = (typeof callback === 'undefined') ? (function () { }) : callback;

        let _this = this;
        this.sumService.getOnDates(_this.ordering.orderBy, _this.pickDateFromValue, _this.pickDateToValue).subscribe(function (response) {
            console.log(response);
            _this.sumsOnDayWrap = response;

            // END
            callback();
        });
    }

    private loadTags(callback: Function): void {
        callback = (typeof callback === 'undefined') ? (function () { }) : callback;

        let _this = this;
        this.tagService.get().subscribe(function (response) {
            console.log(response);
            _this.tags = response;

            // END
            callback();
        });
    }


    /**
     * Misc
     */

    private isInArray(arr: any, id: any): boolean {
        var i = 0;
        while (i < arr.length && arr[i].Id != id)
            i++;
        return i < arr.length;
    }

    formatDate(date: any) {
        return date.substring(0, 10);
    }
}
