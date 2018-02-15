import { Component, OnInit } from '@angular/core';
import { ISum } from '../../_models/index';
import { SumService } from '../../_services/index';
import { ToastrService } from 'toastr-ng2';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

class SumInfo implements ISum {
    constructor(public ID?: number, public TITLE?: string, public DATE?: Date, public SUM?: number) { }
}

@Component({
    selector: 'sum',
    templateUrl: './sum.component.html'
})
export class SumComponent implements OnInit {

    private rowData: any[];
    displayDialog: boolean;
    displayDeleteDialog: boolean;
    newSum: boolean;
    sum: ISum = new SumInfo();
    sums: ISum[];
    public editSumId: any;
    public fullname: string;

    constructor(private sumService: SumService, private toastrService: ToastrService) {

    }

    ngOnInit() {
        this.editSumId = 0;
        //this.loadData();

        var rows: Array<any> = [];
    }

    loadData() {
        let fromDate = new Date(2017, 5, 1);
        let toDate = new Date(2018, 1, 1);
        this.sumService.get(fromDate, toDate)
            .subscribe(function (res) {
                console.log(res.result);
            });
    }

    showDialogToAdd() {
        this.newSum = true;
        this.editSumId = 0;
        this.sum = new SumInfo();
        this.displayDialog = true;
    }


    showDialogToEdit(sum: ISum) {
        this.newSum = false;
        this.sum = new SumInfo();
        this.sum.ID = sum.ID;
        this.sum.TITLE = sum.TITLE;
        this.sum.SUM = sum.SUM;
        this.sum.DATE = sum.DATE;
        this.displayDialog = true;
    }

    onRowSelect(event: any) {
    }

    save() {
        this.sumService.save(this.sum)
            .subscribe(response => {
                (this.sum.ID && this.sum.ID > 0) ?
                    this.toastrService.success('Data updated Successfully') :
                    this.toastrService.success('Data inserted Successfully');
                this.loadData();
            });
        this.displayDialog = false;
    }

    cancel() {
        this.sum = new SumInfo();
        this.displayDialog = false;
    }


    showDialogToDelete(sum: ISum) {
        this.fullname = sum.ID + ' ' + sum.TITLE;
        this.editSumId = sum.ID;
        this.displayDeleteDialog = true;
    }

    okDelete(isDeleteConfirm: boolean) {
        if (isDeleteConfirm) {
            this.sumService.delete(this.editSumId)
                .subscribe(response => {
                    this.editSumId = 0;
                    this.loadData();
                });
            this.toastrService.error('Data Deleted Successfully');
        }
        this.displayDeleteDialog = false;
    }
}