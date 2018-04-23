import { TagModel } from "./tagmodel";
import { ModelBase } from "./modelbase";

export class SumModel extends ModelBase {
    Id: number;
    Title: string;
    InputDate: Date;
    AccountDate: Date;
    DueDate: Date;
    Sum: number;
    Tags: Array<TagModel>;

    IntellisenseTitle: string;

    public Init() {
        this.Id = -1;
        this.Title = "";
        this.Sum = 0;
        this.Tags = [];
    }
}