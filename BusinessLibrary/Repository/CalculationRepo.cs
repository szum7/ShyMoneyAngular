using BusinessLibrary.Common;
using DataAccessLibrary;
using DataAccessLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLibrary.Repository
{
    public class MonthlyResult
    {
        public int id { get; set; }
        public DateTime date { get; set; }
        public string dateString { get; set; }
        public decimal income { get; set; }
        public decimal expense { get; set; }
        /// <summary>
        /// income - expense = flow
        /// </summary>
        public decimal flow { get; set; }
        /// <summary>
        /// Segítségével leolvasható, hogy az adott időszakban nőtt-e a pénzem vagy sem és (+/-)mennyivel.
        /// </summary>
        public decimal cumulatedFlow { get; set; }
        public decimal incomePerDay { get; set; }
        public decimal expensePerDay { get; set; }
        public decimal flowPerDay { get; set; }
        public List<SumModel> sums { get; set; }

        public MonthlyResult()
        {
            this.sums = new List<SumModel>();
        }
    }

    public class TagTotalResult
    {
        public TagModel tag { get; set; }
        public decimal income { get; set; }
        public decimal expense { get; set; }
        /// <summary>
        /// income - expense = flow
        /// </summary>
        public decimal flow { get; set; }
        /// <summary>
        /// Average per day
        /// </summary>
        public decimal flowPerDay { get; set; }
        /// <summary>
        /// Average per month. If from and to are not start and end month days, it counts as start and end month days.
        /// e.g.: 2010-10-05 -> 2010-12-24 => 2010-10-01 -> 2011-01-01 (3 months)
        /// </summary>
        public decimal flowPerMonth { get; set; }
    }

    public class CalculationRepo : ICalculationRepo
    {
        private static Random RND;

        public CalculationRepo()
        {
            CalculationRepo.RND = new Random();
        }

        public void Get()
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                var b = (from d in context.Dates
                         join s in context.Sum on d.Date equals s.InputDate into ds
                         select new {
                             Date = d.Date,
                             ItemCount = ds.ToList().Count
                             //Items = (from item in ds
                             //         select new {
                             //             Title = item.Title,
                             //             Sum = item.Sum
                             //         })
                         });
            }
        }

        // from, to
        // tag1     income      expense     flow    átl/month
        // tag2     income      expense     flow    átl/month
        // ...
        public List<TagTotalResult> TagTotalResult(DateTime FROM, DateTime TO)
        {
            List<TagTotalResult> ret = new List<TagTotalResult>();
            List<SumModel> sums;
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                sums = (from d in context.Sum
                        where (d.State == "Y" && d.InputDate >= FROM && d.InputDate < TO)
                        select new SumModel()
                        {
                            Id = d.Id,
                            Title = d.Title,
                            Sum = d.Sum,
                            InputDate = d.InputDate
                        }).ToList();

                Dictionary<decimal, SumModel> sumDict = new Dictionary<decimal, SumModel>();
                foreach (SumModel sum in sums)
                {
                    sumDict.Add(sum.Id, sum);
                }

                List<TagModel> tags = (from d in context.Tag
                                       where d.State == "Y"
                                       orderby d.Id ascending
                                       select new TagModel()
                                       {
                                           Id = d.Id,
                                           Title = d.Title,
                                           Description = d.Description,
                                           Icon = d.Icon
                                       }).ToList();

                decimal prevId = -1;
                ret.Add(new TagTotalResult());
                foreach (TagModel tag in tags)
                {

                }
            }

            return null;
        }

        // from, to
        // month1
        //   tag1   income   expense   flow   prevMonthDelta with up/down icon    prevMonth and thisMonth átlDelta with u/d-i
        //   tag2   income   expense   flow   prevMonthDelta with up/down icon    prevMonth and thisMonth átlDelta with u/d-i
        // month2
        //   ...

        #region MonthlySumups
        // from, to
        // 2016, december    income      expense     flow       cumulatedFlow       up/down icon
        // 2017, january     income      expense     flow       cumulatedFlow       up/down icon
        // 2017, february    income      expense     flow       cumulatedFlow       up/down icon
        // ...
        public List<MonthlyResult> MonthlySumups(int FROM_YEAR, int FROM_MONTH, int TO_YEAR, int TO_MONTH, bool fakeData)
        {
            DateTime fromDate = new DateTime(FROM_YEAR, FROM_MONTH, 1);
            DateTime toDate = new DateTime(TO_YEAR, TO_MONTH, 1);
            toDate = toDate.AddMonths(1);
            List<SumModel> sums = new List<SumModel>();
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                sums = (from d in context.Sum
                        where (
                          (d.State == "Y")
                          && d.InputDate >= fromDate
                          && d.InputDate < toDate
                        )
                        orderby d.InputDate ascending
                        select new SumModel()
                        {
                            Id = d.Id,
                            Title = d.Title,
                            Sum = d.Sum,
                            InputDate = d.InputDate
                        }).ToList();
            }

            List<MonthlyResult> ret = new List<MonthlyResult>();
            int prevYear = -1;
            int prevMonth = -1;
            int id = 1;
            decimal cumulatedFlow = 0; // starts with 0
            decimal income = 0;
            decimal expense = 0;

            ret.Add(new MonthlyResult());

            foreach (SumModel sum in sums)
            {
                int thisYear = sum.InputDate.Value.Year;
                int thisMonth = sum.InputDate.Value.Month;

                if (fakeData)
                {
                    sum.Sum = CalculationRepo.RND.Next(-150000, 150000);
                }

                if (prevYear != -1 && prevMonth != -1)
                {
                    if (thisMonth != prevMonth || thisYear != prevYear) // new month
                    {
                        // Set last month
                        this.SetMonthlyResult(ret[ret.Count - 1], id++, prevYear, prevMonth, expense, income, cumulatedFlow);

                        // Add new month
                        ret.Add(new MonthlyResult());  

                        // If month(s) are missing
                        // 2010-10 -> 2011-03 => add 11, 12, 1, 2 
                        // ||
                        // 2010-09 -> 2010-12 => 10, 11
                        if ((thisYear != prevYear && prevMonth - thisMonth != 11) ||
                            (thisYear == prevYear && thisMonth - prevMonth != 1))
                        {
                            while ((thisYear != prevYear && prevMonth - thisMonth != 11)
                                || (thisYear == prevYear && thisMonth - prevMonth != 1))
                            {
                                // Increase date (by 1 month)
                                if (prevMonth == 12)
                                {
                                    prevMonth = 1;
                                    prevYear++;
                                }
                                else
                                {
                                    prevMonth++;
                                }

                                // Set last dummy month
                                this.SetMonthlyResult(ret[ret.Count - 1], id++, prevYear, prevMonth, 0, 0, cumulatedFlow);

                                // Add new month
                                ret.Add(new MonthlyResult());
                            }
                        }

                        // Reset
                        income = 0;
                        expense = 0;
                    }
                }

                // Set
                prevYear = thisYear;
                prevMonth = thisMonth;

                // Add SumModel
                ret[ret.Count - 1].sums.Add(sum);

                // Add up
                if (sum.Sum < 0)
                {
                    expense += Math.Abs(sum.Sum.Value);
                }
                else
                {
                    income += sum.Sum.Value;
                }
                cumulatedFlow += sum.Sum.Value;
            }
            // Set last month
            this.SetMonthlyResult(ret[ret.Count - 1], id, prevYear, prevMonth, expense, income, cumulatedFlow);

            return ret;
        }

        void SetMonthlyResult(MonthlyResult monthlyResult, int id, int prevYear, int prevMonth, decimal expense, decimal income, decimal cumulatedFlow)
        {
            int daysInMonth = DateTime.DaysInMonth(prevYear, prevMonth);
            monthlyResult.id = id;
            monthlyResult.date = new DateTime(prevYear, prevMonth, 1);
            monthlyResult.dateString = String.Format("{0}-{1}-01", prevYear, prevMonth);
            monthlyResult.expense = expense;
            monthlyResult.income = income;
            monthlyResult.flow = income - expense;
            monthlyResult.cumulatedFlow = cumulatedFlow;
            monthlyResult.expensePerDay = Math.Round(expense / daysInMonth, 2);
            monthlyResult.incomePerDay = Math.Round(income / daysInMonth, 2);
            monthlyResult.flowPerDay = Math.Round((income - expense) / daysInMonth, 2);
        }
        #endregion

        // from, to
        // graph, x=days y=money
        // sum expense, sum income, cumulatedExpenseFromMonth, cumulatedIncomeFromMonth, cumulatedFlow (old shymoney graph)

        // from, to
        // graph, x=month y=money
        // tag1 income, tag1 expense, tag1 flow

        // from, to
        // graph, x=month y=money
        // tag1 cumulatedIncome, tag1 cumulatedExpense, tag1 cumulatedFlow
        // vonalak közt a hozzáadott mennyiség x1=100, x2=350 -> +250
        // Note: ha a from=2017-10-12 (pl), akkor is kiírhatjuk a kezdő cumulated összegeket (a vezetett 2010-ei dátumtól). A gráfot viszont érdemes 0-tól kezdeni, hogy könnyen leolvasható legyen a változás az adott időintervallumra. (pl tooltipben megjeleníteni a tényleges kezdő értéket)


    }
}
