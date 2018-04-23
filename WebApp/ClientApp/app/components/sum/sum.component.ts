// external libraries
import { Component, OnInit } from '@angular/core';
import { SumService, IntellisenseService, TagService } from '../../_services/index';
import { ToastrService } from 'toastr-ng2';
//import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

// models
import { SumModel } from './../../global/summodel';
import { TagModel } from './../../global/tagmodel';
import { SumsOnDay } from './../../global/sumsonday';
import { SumsOnDayWrap } from './../../global/sumsondaywrap';
import { IntellisenseModel } from './../../global/intellisensemodel';

class Ordering {
    public orderBy: string;
    public steep: string;
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

    // BEGIN test
    // END test

    constructor(
        private sumService: SumService,
        private intellisenseService: IntellisenseService,
        private tagService: TagService,
        private toastrService: ToastrService) {

        // TODO megszerezni user beállításaiból adatbázisból

        this.sumsOnDayWrap = new SumsOnDayWrap(); 
        this.ordering = new Ordering();
        
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

        for (var i = 0; i < event.Tags.length; i++) {
            sum.Tags.push(Object.assign({}, event.Tags[i]));
        }
    }

    public searchIntellisense(event: any, sum: SumModel): void {
        console.log(sum);
        this.intellisenseResults = [];
        for (var i = 0; i < this.intellisenses.length; i++) {
            let title = this.intellisenses[i].Title.toLowerCase();
            if (title.includes(event.query.toLowerCase())) {
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

    loadIntellisenses(callback: Function): void {
        let _this = this;
        this.intellisenseService.get().subscribe(function (response) {
            console.log(response);
            _this.intellisenses = response;

            // END
            callback();
        });
    }

    loadSums(callback: Function): void {
        let _this = this;
        this.sumService.getOnDates(_this.ordering.orderBy, _this.pickDateFromValue, _this.pickDateToValue).subscribe(function (response) {
            console.log(response);
            _this.sumsOnDayWrap = response;

            // END
            callback();
        });
    }

    loadTags(callback: Function): void {
        let _this = this;
        this.tagService.get().subscribe(function (response) {
            console.log(response);
            _this.tags = response;

            // END
            callback();
        });
    }

    public save(sum: SumModel): void {
        this.sumService.save(sum).subscribe(function (response) {
            sum.Id = response.Id;
        });
    }

    public delete(day: SumsOnDay, index: number, id: number): void {
        this.sumService.delete(id).subscribe(function (response) {
            if (response) {
                day.Data.splice(index, 1);
            }
        });
    }
}
