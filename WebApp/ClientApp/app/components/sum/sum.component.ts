import { Component, OnInit } from '@angular/core';
import { SumService } from '../../_services/index';
import { ToastrService } from 'toastr-ng2';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

@Component({
    selector: 'sum',
    templateUrl: './sum.component.html',
    styleUrls: ['./sum.component.css']
})
export class SumComponent implements OnInit {

    public fromDate: Date;
    public toDate: Date;
    public sums: Array<Sum>;

    public rangeValues: number[] = [20, 80];

    constructor(private sumService: SumService, private toastrService: ToastrService) {
        // TODO megszerezni user beállításaiból adatbázisból
        this.fromDate = new Date(new Date().setDate(new Date().getDate() - 60));
        this.toDate = new Date(new Date().setDate(new Date().getDate()));
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        let _this = this;
        this.sumService.get(_this.fromDate, _this.toDate).subscribe(function (response) {
            console.log(response);
            _this.sums = response.data;
        });
    }

    save(d: Sum) {
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