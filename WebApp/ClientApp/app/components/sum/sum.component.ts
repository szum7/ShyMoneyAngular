// external libraries
import { Component, OnInit } from '@angular/core';
import { SumService } from '../../_services/index';
import { ToastrService } from 'toastr-ng2';
//import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

// models
import { SumModel } from './../../global/summodel';
import { SumsOnDay } from './../../global/sumsonday';
import { SumsOnDayWrap } from './../../global/sumsondaywrap';

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

    // BEGIN test   
    // END test
    
    constructor(private sumService: SumService, private toastrService: ToastrService) {

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
        this.loadData();
    }

    public add(day: SumsOnDay): void {
        console.log(day);
        if (day.data) {
            let newSum: SumModel = new SumModel();
            newSum.Init();
            newSum.INPUT_DATE = day.date;
            newSum.DUE_DATE = day.date;
            newSum.ACCOUNT_DATE = day.date;
            day.data.push(newSum);
        }
    }

    public loadData(): void {
        let _this = this;
        this.sumService.getOnDates(_this.ordering.orderBy, _this.pickDateFromValue, _this.pickDateToValue).subscribe(function (response) {
            console.log(response);
            _this.sumsOnDayWrap = response;
        });
    }

    public save(sum: SumModel): void {
        this.sumService.save(sum).subscribe(function (response) {
            sum.ID = response.ID;
        });
    }

    public delete(day: SumsOnDay, index: number, id: number): void {
        this.sumService.delete(id).subscribe(function (response) {
            if (response) {
                day.data.splice(index, 1);
            }
        });
    }
}
