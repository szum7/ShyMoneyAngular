import { TagModel } from "./tagmodel";
import { ModelBase } from "./modelbase";

export class SumModel extends ModelBase {
    ID: number;
    TITLE: string;
    INPUT_DATE: Date;
    ACCOUNT_DATE: Date;
    DUE_DATE: Date;
    SUM: number;
    tags: Array<TagModel>;

    public Init() {
        this.ID = -1;
        this.TITLE = "";
        this.SUM = 0;
        this.tags = [];
    }
}