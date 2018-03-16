import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'date-range-picker',
    templateUrl: './daterangepicker.component.html',
    styleUrls: ['./daterangepicker.component.css']
})
export class DateRangePickerComponent implements OnInit {

    counterValue: string;
    @Output() counterChange = new EventEmitter();

    @Input()
    get counter() {
        return this.counterValue;
    }

    set counter(val) {
        this.counterValue = val;
        this.counterChange.emit(this.counterValue);
    }

    decrement() {
        this.counter = "barack";
    }

    public pickDateFrom: Date;
    public pickDateTo: Date;

    public minDate: number;
    public maxDate: number;
    public dateRange: Array<number>;
    public sliderStep: number;

    constructor() {        
        this.minDate = (new Date(2017, 1, 1)).getTime();
        this.maxDate = (new Date()).getTime();

        var date = new Date();
        this.pickDateFrom = new Date(date.getFullYear() - 1, date.getMonth(), 1);
        this.pickDateTo = date;

        this.dateRange = [this.pickDateFrom.getTime(), this.pickDateTo.getTime()];
        this.sliderStep = 86400000;
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
        var months;
        months = (this.pickDateTo.getFullYear() - this.pickDateFrom.getFullYear()) * 12;
        months -= this.pickDateFrom.getMonth() + 1;
        months += this.pickDateTo.getMonth();
        //return (months <= 0 ? 0 : months) + " months";
        return (this.pickDateTo.getMonth() - this.pickDateFrom.getMonth() + (12 * (this.pickDateTo.getFullYear() - this.pickDateFrom.getFullYear()))) + " months";
    }

    public getYearsInRange(): string {
        var ageDifMs = (this.pickDateTo as any) - this.pickDateFrom.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970) + " years";
    }

    public getMarginInputFromDateCss(): string {
        return ((this.dateRange[0] - this.minDate) * 100 / (this.maxDate - this.minDate)) + "%";
    }

    public getMarginInputToDateCss(): string {
        return "calc(" + (((this.dateRange[1] - this.minDate) * 100 / (this.maxDate - this.minDate))) + "% - 87px)";
    }

    public dateInputChanged(): void {
        this.dateRange = [this.pickDateFrom.getTime(), this.pickDateTo.getTime()];
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
