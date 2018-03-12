import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'toastr-ng2';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

@Component({
    selector: 'date-range-picker',
    templateUrl: './daterangepicker.component.html',
    styleUrls: ['./daterangepicker.component.css']
})
export class DateRangePickerComponent implements OnInit {

    constructor() {

    }

    ngOnInit(): void {

    }
}
