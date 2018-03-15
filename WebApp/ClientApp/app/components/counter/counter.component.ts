import { Component } from '@angular/core';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    
    public pickDateFrom: Date = new Date(2010, 9, 1);
    public pickDateTo: Date = new Date(2018, 4, 10);

    public minDate: number = (new Date(2010, 9, 1)).getTime();
    public maxDate: number = (new Date(2018, 4, 10)).getTime();
    public dateRange: Array<number> = [this.minDate, this.maxDate];
    public psStep = 86400000;

    public dateInputChanged() {
        this.dateRange = [this.pickDateFrom.getTime(), this.pickDateTo.getTime()];
    }

    public sliderInputChanged() {
        this.pickDateFrom = new Date(this.dateRange[0]);
        this.pickDateTo = new Date(this.dateRange[1]);
    }

    public soutVal() {
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

    public soutVal2() {
        return (new Date(this.dateRange[0])) + " - " + (new Date(this.dateRange[1]));
    }
}
