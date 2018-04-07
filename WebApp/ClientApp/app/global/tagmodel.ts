
import { ModelBase } from "./modelbase";

export class TagModel extends ModelBase {
    Id?: number;
    Title?: string;
    Description?: string;
    Icon?: string;
    QuickbarPlace?: number;
}