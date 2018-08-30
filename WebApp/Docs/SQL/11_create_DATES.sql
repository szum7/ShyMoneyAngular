CREATE TABLE [dbo].[DATES] (
  [ID] NUMERIC(15, 0) IDENTITY(1, 1) NOT NULL,
  [DATE] DATETIME NOT NULL,
  CONSTRAINT [PK_DATESID] PRIMARY KEY NONCLUSTERED ([ID])
)
ON [PRIMARY]
GO

-- ////////////////////////

;WITH d AS 
(
  SELECT TOP (4000) d = DATEADD(DAY, ROW_NUMBER() OVER (ORDER BY object_id), '20160512')
  FROM sys.all_objects
)
INSERT dbo.[DATES]([DATE])
  SELECT d FROM d 
  WHERE d NOT IN (SELECT [DATE] FROM dbo.[DATES])
  AND d <= DATEADD(DAY, 0-DATEPART(WEEKDAY, GETDATE()), GETDATE());

-- ////////////////////////

DECLARE @MinDate DATE = '20140101',
        @MaxDate DATE = '20140206';

SELECT  TOP (DATEDIFF(DAY, @MinDate, @MaxDate) + 1)
        Date2 = DATEADD(DAY, ROW_NUMBER() OVER(ORDER BY a.object_id) - 1, @MinDate)
FROM    sys.all_objects a, SUM
        CROSS JOIN sys.all_objects b

-- ////////////////////////

select d.DATE, count(s.ID) sums
from DATES d
left join SUM s on (s.INPUT_DATE = d.DATE)
group by s.INPUT_DATE, d.DATE
order by d.DATE asc