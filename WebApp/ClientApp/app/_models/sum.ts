class Sum extends ModelBase {
    ID?: number;
    TITLE?: string;
    INPUT_DATE?: Date;
    ACCOUNT_DATE?: Date;
    DUE_DATE?: Date;
    SUM?: number;
    tags?: Array<Tag>;
}