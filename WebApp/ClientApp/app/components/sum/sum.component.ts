// external libraries
import { Component, OnInit } from '@angular/core';
import { SumService } from '../../_services/index';
import { ToastrService } from 'toastr-ng2';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

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
    public rangeValues: number[] = [20, 80];
    //public sumsOnDayWrap = { data: [] };
    // END test

    constructor(private sumService: SumService, private toastrService: ToastrService) {
        // TODO megszerezni user beállításaiból adatbázisból       
        this.fromDate = new Date(new Date().setDate(new Date().getDate() - 60));
        this.toDate = new Date(new Date().setDate(new Date().getDate()));
        this.sumsOnDayWrap = new SumsOnDayWrap(); 
        this.ordering = new Ordering();
        
        // set defaults
        this.ordering.orderBy = "INPUT_DATE";        
        this.ordering.steep = "ASC";
    }

    ngOnInit() {
        this.loadData();
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
