
import { ModelBase } from "./modelbase";

export class TagModel extends ModelBase {
    ID?: number;
    TITLE?: string;
    DESCRIPTION?: string;
    ICON?: string;
    QUICKBAR_PLACE?: number;
}