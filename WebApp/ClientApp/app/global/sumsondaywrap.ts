import { SumsOnDay } from "./sumsonday";

export class SumsOnDayWrap {

    DateType: string;
    Data: Array<SumsOnDay>;

    constructor() {
        this.Data = [];
        this.DateType = "UNSET";
    }
}