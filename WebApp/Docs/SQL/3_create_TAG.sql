CREATE TABLE [dbo].[TAG] (
  [ID] numeric(15, 0) IDENTITY(1, 1) NOT NULL,
  [TITLE] varchar(255) COLLATE Hungarian_CI_AS NOT NULL,
  [DESCRIPTION] varchar(255) COLLATE Hungarian_CI_AS NULL,
  [ICON] varchar(255) COLLATE Hungarian_CI_AS NULL,
  [QUICKBAR_PLACE] NUMERIC(5) NULL,
  [MODIFY_BY] numeric(15, 0) NULL,
  [MODIFY_DATE] datetime NULL,
  [CREATE_BY] numeric(15, 0) NULL,
  [CREATE_DATE] datetime NULL,
  [STATE] varchar(1) COLLATE Hungarian_CI_AS NOT NULL,
  CONSTRAINT [PK_TAGID] PRIMARY KEY NONCLUSTERED ([ID])
)
ON [PRIMARY]
GO