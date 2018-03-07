import { Component, OnInit } from '@angular/core';
import { SumService } from '../../_services/index';
import { ToastrService } from 'toastr-ng2';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

//import { SumsOnDay } from '../../_models/_custom_models/sumsonday';
//import { SumsOnDayWrap } from '../../_models/_custom_models/sumsondaywrap';

//import '../../_models/tag';
//import '../../_models/sum';
//import '../../_models/_custom_models/sumsonday';
//import '../../_models/_custom_models/sumsondaywrap';

import { SumModel } from './../../global/summodel';
import { SumsOnDayWrap } from './../../global/sumsondaywrap';

@Component({
    selector: 'sum',
    templateUrl: './sum.component.html',
    styleUrls: ['./sum.component.css']
})
export class SumComponent implements OnInit {

    public fromDate: Date;
    public toDate: Date;
    public sumModel: SumModel;

    public sumsOnDayWrap: SumsOnDayWrap;

    // BEGIN test
    public rangeValues: number[] = [20, 80];
    //public sumsOnDayWrap = { data: [] };
    // END test

    constructor(private sumService: SumService, private toastrService: ToastrService) {
        // TODO megszerezni user beállításaiból adatbázisból
        this.sumsOnDayWrap = new SumsOnDayWrap();
        console.log(this.sumsOnDayWrap.dateType);
        console.log((new SumModel()));
        this.fromDate = new Date(new Date().setDate(new Date().getDate() - 60));
        this.toDate = new Date(new Date().setDate(new Date().getDate()));

        this.sumModel = new SumModel();
        this.sumModel.CREATE_BY = 1;
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        let _this = this;
        //this.sumService.getOnDates("INPUT_DATE", _this.fromDate, _this.toDate).subscribe(function (response) {
        //    console.log(response);
        //    _this.sumsOnDayWrap = response;
        //});
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