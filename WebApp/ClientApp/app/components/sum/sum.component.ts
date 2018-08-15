// external libraries
import { Component, OnInit } from '@angular/core';
import { SumService, IntellisenseService, TagService } from '../../_services/index';
import { ToastrService } from 'toastr-ng2';
//import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';
import { HostListener } from '@angular/core';

// models
import { SumModel } from './../../global/summodel';
import { TagModel } from './../../global/tagmodel';
import { SumsOnDay } from './../../global/sumsonday';
import { SumsOnDayWrap } from './../../global/sumsondaywrap';
import { IntellisenseModel } from './../../global/intellisensemodel';

class Ordering {
    public orderBy?: string;
    public steep?: string;
}

class ControlNavigation {
    // NOTE: ezek akkor kellenek, ha nem tudok DOM szerint lépkedni, hanem külön listát kell vezetnem
    public controlList: Array<any/*DOM*/>;
    public actControl: any/*DOM*/;
    public actIndex?: number;

    public constructor(){
        this.controlList = [];
    }

    public addControl() {

    }

    public focusNextControl(event: any): void {
        console.log(event);
        console.log(document.activeElement);
    }
}

@Component({
    selector: 'sum',
    templateUrl: './sum.component.html',
    styleUrls: ['./sum.component.css']
})
export class SumComponent implements OnInit {
        
    public ordering: Ordering;
    public sumsOnDayWrap: SumsOnDayWrap;

    // DateRangePicker properties
    public pickDateFromValue: Date;
    public pickDateToValue: Date;
    //public minDate: number = (new Date(2017, 1, 1)).getTime();
    //public maxDate: number = (new Date()).getTime();

    public intellisenses: Array<IntellisenseModel>;
    public intellisenseResults: Array<IntellisenseModel>;

    public tags: Array<TagModel>;

    private controlNavigation: ControlNavigation;

    // BEGIN test
    // END test

    constructor(
        private sumService: SumService,
        private intellisenseService: IntellisenseService,
        private tagService: TagService,
        private toastrService: ToastrService) {

        // TODO megszerezni user beállításaiból adatbázisból

        this.intellisenses = [];
        this.intellisenseResults = [];
        this.tags = [];
        this.sumsOnDayWrap = new SumsOnDayWrap(); 
        this.ordering = new Ordering();
        this.controlNavigation = new ControlNavigation();
        
        // set defaults
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

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        //console.log(event.DOM_KEY_LOCATION_RIGHT);
        //if (event.getModifierState && event.getModifierState('Control') && event.keyCode == 37) {
        //    console.log("IN");
        //    console.log(event);
        //}
    }
    
    public handleKeyPress(event: any): void {
        if (event.ctrlKey && (event.keyCode >= 37 && event.keyCode <= 40)) {
            this.controlNavigation.focusNextControl(event);
        }
    }

    

    public formatDate(date: any) {
        return date.substring(0, 10);
    }

    public setSumOnIntellisense(event: IntellisenseModel, sum: SumModel): void {
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

    public searchIntellisense(event: any, sum: SumModel): void {
        this.intellisenseResults = [];
        for (var i = 0; i < this.intellisenses.length; i++) {
            let title = this.intellisenses[i].Title.toLowerCase();
            if (title.toLowerCase().includes(event.query.toLowerCase())) {
                this.intellisenseResults.push(this.intellisenses[i]);
            }
        }
    }

    public add(day: SumsOnDay): void {
        console.log(day);
        if (day.Data) {
            let newSum: SumModel = new SumModel();
            newSum.Init();
            newSum.InputDate = day.Date;
            newSum.DueDate = day.Date;
            newSum.AccountDate = day.Date;
            day.Data.push(newSum);
        }
    }

    public save(sum: SumModel): void {
        this.sumService.save(sum).subscribe(function (response) {
            sum.Id = response.Id;
        });
    }

    public delete(day: SumsOnDay, index: number, id: number): void {
        if (id >= 0) {
            this.sumService.delete(id).subscribe(function (response) {
                if (response) {
                    day.Data.splice(index, 1);
                }
            });
        } else {
            day.Data.splice(index, 1);
        }
    }

    loadIntellisenses(callback: Function): void {
        callback = (typeof callback === 'undefined') ? (function () { }) : callback;

        let _this = this;
        this.intellisenseService.get().subscribe(function (response) {
            console.log(response);
            _this.intellisenses = response;

            // END
            callback();
        });
    }

    loadSums(callback: Function): void {
        callback = (typeof callback === 'undefined') ? (function () { }) : callback;

        let _this = this;
        this.sumService.getOnDates(_this.ordering.orderBy, _this.pickDateFromValue, _this.pickDateToValue).subscribe(function (response) {
            console.log(response);
            _this.sumsOnDayWrap = response;

            // END
            callback();
        });
    }

    loadTags(callback: Function): void {
        callback = (typeof callback === 'undefined') ? (function () { }) : callback;

        let _this = this;
        this.tagService.get().subscribe(function (response) {
            console.log(response);
            _this.tags = response;

            // END
            callback();
        });
    }

    deleteFromDay(day: SumsOnDay, sumId: number): boolean {
        var i: number = 0;
        while (i < day.Data.length && day.Data[i].Id != sumId)
            i++;
        if (i < day.Data.length) {
            day.Data.splice(i, 1);
            return true;
        }
        return false;
    }

    isInArray(arr: any, id: any): boolean {
        var i = 0;
        while (i < arr.length && arr[i].Id != id)
            i++;
        return i < arr.length;
    }
}
