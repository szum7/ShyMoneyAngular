import { SumsOnDay } from "./sumsonday";

export class SumsOnDayWrap {

    dateType?: string;
    data?: Array<SumsOnDay>;

    constructor() {
        this.data = [];
        this.dateType = "UNSET";
    }
}