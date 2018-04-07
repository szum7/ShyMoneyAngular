import { TagModel } from "./tagmodel";
import { ModelBase } from "./modelbase";

export class IntellisenseModel extends ModelBase {
    Id: number;
    Title: string;
    Description: string;
    SumTitle: string;
    SumDescription: string;
    SumSum: number;
    SumInputDate: Date;
    SumAccountDate: Date;
    SumDueDate: Date;
    IsDatesMatch: boolean;
    IsSaveOnSelect: boolean;
    IsTodayDates: boolean;
    IsDatesOverwriteable: boolean;
    Tags: Array<TagModel>;
}