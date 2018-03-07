import { SumModel } from "./summodel";

export class SumsOnDay {

    date?: Date;
    data?: Array<SumModel>;

    constructor() {
        this.data = [];
    }
}