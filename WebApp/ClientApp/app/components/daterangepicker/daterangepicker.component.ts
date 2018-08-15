import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'date-range-picker',
    templateUrl: './daterangepicker.component.html',
    styleUrls: ['./daterangepicker.component.css']
})
export class DateRangePickerComponent implements OnInit {

    pickDateFromValue?: Date;
    @Input() get pickDateFrom() { return this.pickDateFromValue; }
    @Output() pickDateFromChange = new EventEmitter();
    set pickDateFrom(val) {
        this.pickDateFromValue = val;
        this.pickDateFromChange.emit(this.pickDateFromValue);
    }

    pickDateToValue?: Date;
    @Input() get pickDateTo() { return this.pickDateToValue; }
    @Output() pickDateToChange = new EventEmitter();
    set pickDateTo(val) {
        this.pickDateToValue = val;
        this.pickDateToChange.emit(this.pickDateToValue);
    }

    minDate: number = (new Date(2017, 1, 1)).getTime();
    //minDateValue: number;
    //@Input() get minDate() { return this.minDateValue; }
    //@Output() minDateChange = new EventEmitter();
    //set minDate(val) {
    //    this.minDateValue = val;
    //    this.minDateChange.emit(this.minDateValue);
    //}

    maxDate: number = (new Date()).getTime();
    //maxDateValue: number;
    //@Input() get maxDate() { return this.maxDateValue; }
    //@Output() maxDateChange = new EventEmitter();
    //set maxDate(val) {
    //    this.maxDateValue = val;
    //    this.maxDateChange.emit(this.maxDateValue);
    //}

    public dateRange: Array<number>;
    public sliderStep: number;

    constructor() {
        this.setDefaultMinMaxDate();
        this.setDefaultFromTo();

        if (!this.pickDateFrom)
            this.pickDateFrom = new Date(2000, 1, 1);

        if (!this.pickDateTo)
            this.pickDateTo = new Date(2001, 1, 1);

        this.dateRange = [this.pickDateFrom.getTime(), this.pickDateTo.getTime()];
        this.sliderStep = 86400000;
    }

    private setDefaultMinMaxDate(): void {
        if (!this.minDate) this.minDate = (new Date(2017, 1, 1)).getTime();
        if (!this.maxDate) this.maxDate = (new Date()).getTime();
    }

    private setDefaultFromTo(): void {
        var date = new Date();
        if (!this.pickDateFrom) this.pickDateFrom = new Date(date.getFullYear() - 1, date.getMonth(), 1);
        if (!this.pickDateTo) this.pickDateTo = date;
    }

    ngOnInit(): void {
    }

    public timeShowLeftCss(): string {
        var percent = ((this.dateRange[0] - this.minDate) * 100 / (this.maxDate - this.minDate));
        percent += ((this.dateRange[1] - this.minDate) * 100 / (this.maxDate - this.minDate));
        return "calc(" + (percent / 2) + "% - 30px)";
    }

    public getDaysInRange(): string {
        var days = Math.round(((this.pickDateTo as any) - (this.pickDateFrom as any)) / (1000 * 60 * 60 * 24));
        return days + " days";
    }

    public getMonthsInRange(): string {
        if (this.pickDateTo && this.pickDateFrom) {
            var months;
            months = (this.pickDateTo.getFullYear() - this.pickDateFrom.getFullYear()) * 12;
            months -= this.pickDateFrom.getMonth() + 1;
            months += this.pickDateTo.getMonth();
            //return (months <= 0 ? 0 : months) + " months";
            return (this.pickDateTo.getMonth() - this.pickDateFrom.getMonth() + (12 * (this.pickDateTo.getFullYear() - this.pickDateFrom.getFullYear()))) + " months";
        }
        return "";
    }

    public getYearsInRange(): string {
        if (this.pickDateTo && this.pickDateFrom) {
            var ageDifMs = (this.pickDateTo as any) - this.pickDateFrom.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970) + " years";
        }
        return "";
    }

    public getMarginInputFromDateCss(): string {
        return ((this.dateRange[0] - this.minDate) * 100 / (this.maxDate - this.minDate)) + "%";
    }

    public getMarginInputToDateCss(): string {
        return "calc(" + (((this.dateRange[1] - this.minDate) * 100 / (this.maxDate - this.minDate))) + "% - 87px)";
    }

    public dateInputChanged(): void {
        if (this.pickDateTo && this.pickDateFrom) {
            this.dateRange = [this.pickDateFrom.getTime(), this.pickDateTo.getTime()];
        }
    }

    public sliderInputChanged(): void {
        this.pickDateFrom = new Date(this.dateRange[0]);
        this.pickDateTo = new Date(this.dateRange[1]);
    }

    public showRange(): string {
        var str: string = "";
        var dateFrom: Date = new Date(this.dateRange[0]);
        var dateTo: Date = new Date(this.dateRange[1]);
        str += dateFrom.getFullYear() + "-";
        str += ((dateFrom.getMonth() + 1) < 10) ? "0" : "";
        str += (dateFrom.getMonth() + 1) + "-";
        str += (dateFrom.getDate() < 10) ? "0" : "";
        str += dateFrom.getDate() + " -> ";
        str += dateTo.getFullYear() + "-";
        str += ((dateTo.getMonth() + 1) < 10) ? "0" : "";
        str += (dateTo.getMonth() + 1) + "-";
        str += (dateTo.getDate() < 10) ? "0" : "";
        str += dateTo.getDate();
        return str;
    }

    public showRange2(): string {
        return (new Date(this.dateRange[0])) + " - " + (new Date(this.dateRange[1]));
    }
}
