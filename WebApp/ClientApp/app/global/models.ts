//class ModelBase {
//    CREATE_BY?: number;
//    CREATE_DATE?: Date;
//    MODIFY_BY?: number;
//    MODIFY_DATE?: Date;
//    STATE?: string;
//}

//// ------

//class Sum extends ModelBase {
//    ID?: number;
//    TITLE?: string;
//    INPUT_DATE?: Date;
//    ACCOUNT_DATE?: Date;
//    DUE_DATE?: Date;
//    SUM?: number;
//    tags?: Array<Tag>;
//}

//class Tag extends ModelBase {
//    ID?: number;
//    TITLE?: string;
//    DESCRIPTION?: string;
//    ICON?: string;
//    QUICKBAR_PLACE?: number;
//}

//// ------

//class SumsOnDay {

//    date?: Date;
//    data?: Array<Sum>;

//    constructor() {
//        this.data = [];
//    }
//}

//class SumsOnDayWrap {

//    dateType?: string;
//    data?: Array<SumsOnDay>;

//    constructor() {
//        this.data = [];
//        this.dateType = "UNSET";
//    }
//}