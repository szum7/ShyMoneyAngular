// Core modules
import { Component, OnInit, HostListener } from '@angular/core';

// Addons
import { ToastrService } from 'toastr-ng2';
//import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

// Services
import { SumService, IntellisenseService, TagService } from '../../_services/index';

// Models
import { SumModel } from './../../global/summodel';
import { TagModel } from './../../global/tagmodel';
import { SumsOnDay } from './../../global/sumsonday';
import { SumsOnDayWrap } from './../../global/sumsondaywrap';
import { IntellisenseModel } from './../../global/intellisensemodel';

// Classes
import { TableSheet } from './core/TableSheet';
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
        
    ordering: Ordering;

    // DateRangePicker properties
    pickDateFromValue: Date;
    pickDateToValue: Date;
    //minDate: number = (new Date(2017, 1, 1)).getTime();
    //maxDate: number = (new Date()).getTime();

    intellisenses: Array<IntellisenseModel>;
    intellisenseResults: Array<IntellisenseModel>;

    tags: Array<TagModel>;
    
    ctrl: Control;

    tableSheet: TableSheet;
    structure: any;
    
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
        this.ordering = new Ordering();
        
        // Set defaults
        this.ordering.orderBy = "INPUT_DATE";        
        this.ordering.steep = "ASC";

        // Init DateRangePicker properties
        //var date = new Date();
        this.pickDateFromValue = new Date(2018, 0, 1); //new Date(date.getFullYear() - 1, date.getMonth(), 1);
        this.pickDateToValue = new Date(2018, 2, 14);
        
        this.structure  = {
            levels: [
                {
                    title: null, // root
                    childArray: 'Data',
                    fields: [
                        { title: 'Add', type: 'button', readonly: false },
                        { title: 'Date', type: 'date', readonly: true }
                    ]
                },
                {
                    title: 'Data',
                    childArray: null,
                    fields: [
                        { title: 'Remove', type: 'button', readonly: false },
                        { title: 'Save', type: 'button', readonly: false },
                        { title: '', type: 'intellisense', readonly: false },
                        //{ title: 'Id', type: 'int', readonly: true },
                        { title: 'Title', type: 'text', readonly: false },
                        //{ title: 'InputDate', type: 'date', readonly: false },
                        //{ title: 'AccountDate', type: 'date', readonly: false },
                        //{ title: 'DueDate', type: 'date', readonly: false },
                        { title: 'Sum', type: 'int', readonly: false },
                        { title: 'Tags', type: 'ddl', readonly: false }
                    ]
                }
            ]
        };

        this.ctrl = new Control(this.sumService);
        this.tableSheet = new TableSheet(this.structure);

        // Add new sum
        this.structure.levels[0].fields[0].action = (function (_this: any) {
            _this.push({
                Id: null,
                Title: null,
                Sum: null,
                Tags: []
            });
            // TODO
        });
        // Delete sum
        this.structure.levels[1].fields[0].action = (function (_this: any) {
            if (confirm("Delete row?")) {
                _this.splice(_this.selectedSum, 1);
                // TODO
            }
        });
        // Save sum
        this.structure.levels[1].fields[1].action = (function (_this: any) {
            // TODO
        });
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
            _this.tableSheet.input = response.Data;
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

    isInArray(arr: any, id: any): boolean {
        var i = 0;
        while (i < arr.length && arr[i].Id != id)
            i++;
        return i < arr.length;
    }

    public formatDate(date: any): string { // 2010-10-01 12:00:00 -> 2010-10-01
        return date.substring(0, 10);
    }
}
