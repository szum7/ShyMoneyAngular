CREATE TABLE [dbo].[SUM] (
  [ID] numeric(15, 0) IDENTITY(1, 1) NOT NULL,
  [TITLE] varchar(255) COLLATE Hungarian_CI_AS NULL,
  [SUM] numeric(15, 0) NULL,
  [DATE] datetime NULL,
  [MODIFY_BY] numeric(15, 0) NULL,
  [MODIFY_DATE] datetime NULL,
  [CREATE_BY] numeric(15, 0) NULL,
  [CREATE_DATE] datetime NULL,
  [STATE] varchar(1) COLLATE Hungarian_CI_AS NOT NULL,
  CONSTRAINT [PK_SUMID] PRIMARY KEY NONCLUSTERED ([ID])
)
ON [PRIMARY]
GO