// external libraries
import { Component, OnInit } from '@angular/core';
import { SumService } from '../../_services/index';
import { ToastrService } from 'toastr-ng2';
//import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

// models
import { SumModel } from './../../global/summodel';
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

    public fromDate: Date;
    public toDate: Date;
    public ordering: Ordering;
    public sumsOnDayWrap: SumsOnDayWrap;

    // BEGIN test
    //public sumsOnDayWrap = { data: [] };
    // END test

    // BEGIN DateRangePicker
    public dateRange: number[];
    public minDate: number;
    public maxDate: number;
    // END DateRangePicker
    
    constructor(private sumService: SumService, private toastrService: ToastrService) {
        // TODO megszerezni user beállításaiból adatbázisból       
        this.fromDate = new Date(new Date().setDate(new Date().getDate() - 70));
        this.toDate = new Date(new Date().setDate(new Date().getDate()));
        this.sumsOnDayWrap = new SumsOnDayWrap(); 
        this.ordering = new Ordering();
        
        // set defaults
        this.ordering.orderBy = "INPUT_DATE";        
        this.ordering.steep = "ASC";

        this.minDate = (new Date(2010, 1, 1)).getTime();
        this.maxDate = new Date().getTime();
        this.dateRange = [(new Date(2010, 1, 1).getTime()) + 50000000000, (new Date().getTime()) - 50000000000];
    }

    ngOnInit() {
        this.loadData();
    }

    public showDateRange(): string {
        var str: string = "";
        var dateFrom: Date = new Date(this.dateRange[0]);
        var dateTo: Date = new Date(this.dateRange[1]);
        str += dateFrom.getFullYear() + "-";
        str += (dateFrom.getMonth() < 10) ? "0" : "";
        str += dateFrom.getMonth() + "-";
        str += (dateFrom.getDay() < 10) ? "0" : "";
        str += dateFrom.getDay() + " -> ";
        str += dateTo.getFullYear() + "-";
        str += (dateTo.getMonth() < 10) ? "0" : "";
        str += dateTo.getMonth() + "-";
        str += (dateTo.getDay() < 10) ? "0" : "";
        str += dateTo.getDay();
        return str;
    }

    loadData() {
        let _this = this;
        this.sumService.getOnDates(_this.ordering.orderBy, _this.fromDate, _this.toDate).subscribe(function (response) {
            console.log(response);
            _this.sumsOnDayWrap = response;
        });
    }

    save(d: SumModel) {
        this.sumService.save(d).subscribe(function (response) {
            console.log(response);
        });
    }

    delete(id: number) {
        this.sumService.delete(id).subscribe(function (response) {
            console.log(response);
        });
    }
}
