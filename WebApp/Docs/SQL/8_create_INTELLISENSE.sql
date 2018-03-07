CREATE TABLE [dbo].[INTELLISENSE] (
  -- self fields
  [ID] numeric(15, 0) IDENTITY(1, 1) NOT NULL,
  [TITLE] varchar(255) COLLATE Hungarian_CI_AS NOT NULL,
  [DESCRIPTION] varchar(255) COLLATE Hungarian_CI_AS NULL,
  -- sum fields
  [SUM_TITLE] varchar(255) COLLATE Hungarian_CI_AS NULL,
  [SUM_DESCRIPTION] varchar(255) COLLATE Hungarian_CI_AS NULL,
  [SUM_SUM] numeric(15, 0) NULL,
  [SUM_INPUT_DATE] datetime NULL,
  [SUM_ACCOUNT_DATE] datetime NULL,
  [SUM_DUE_DATE] datetime NULL,
  [IS_DATES_MATCH] bit DEFAULT 0,
  [IS_SAVE_ON_SELECT] bit DEFAULT 0,
  [IS_TODAY_DATES] bit DEFAULT 0,
  [IS_DATES_OVERWRITEABLE] bit DEFAULT 1,
  -- general fields
  [MODIFY_BY] numeric(15, 0) NULL,
  [MODIFY_DATE] datetime NULL,
  [CREATE_BY] numeric(15, 0) NULL,
  [CREATE_DATE] datetime NULL,
  [STATE] varchar(1) COLLATE Hungarian_CI_AS NOT NULL,
  CONSTRAINT [PK_INTELLISENSEID] PRIMARY KEY NONCLUSTERED ([ID])
)
ON [PRIMARY]

EXEC sp_addextendedproperty 'MS_Description', N'Ha igaz, akkor a már, felület által beállított dátumokat nem fogja behelyettesíteni az intellisense értékkel.', 'schema', 'dbo', 'table', 'INTELLISENSE', 'column', 'IS_DATES_OVERWRITEABLE'

GO