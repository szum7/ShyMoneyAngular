using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccessLibrary.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using BusinessLibrary.Common;
using DataAccessLibrary.CustomModels;
using BusinessLibrary.Common.Enum;

namespace BusinessLibrary.Repository
{
    public class SumRepository : ISumRepository
    {
        private decimal tmpUserId = 2;

        #region Get Methods
        public SumsOnDayWrap GetOnDates(DateTypeEnum dateType, DateTime? FROM_DATE = null, DateTime? TO_DATE = null)
        {
            // Set default dates
            DateTime start = DateTime.Now.AddDays(-60);
            if (FROM_DATE != null)
                start = FROM_DATE.Value;

            DateTime end = DateTime.Now.AddDays(60);
            if (TO_DATE != null)
                end = TO_DATE.Value;
            else if (TO_DATE == null && FROM_DATE != null)
                end = FROM_DATE.Value.AddDays(60);

            // Get dates
            List<DateTime> dates = Global.GetDatesInRange(start, end);

            // Get sums
            List<SumModel> sums = new List<SumModel>();
            if (dateType == DateTypeEnum.INPUT_DATE) sums = this.GetWithTags(start, end).OrderBy(x => x.InputDate).ToList();
            else if (dateType == DateTypeEnum.ACCOUNT_DATE) sums = this.GetWithTags(start, end).OrderBy(x => x.AccountDate).ToList();
            else if (dateType == DateTypeEnum.DUE_DATE) sums = this.GetWithTags(start, end).OrderBy(x => x.DueDate).ToList();

            return this.AssableSumsWithDates(sums, dates, dateType);
        }

        public List<SumModel> Get(DateTime? FROM_DATE = null, DateTime? TO_DATE = null)
        {

            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                return (from d in context.Sum
                        where (
                          (d.State == "Y")
                          && (FROM_DATE == null || d.InputDate >= FROM_DATE)
                          && (TO_DATE == null || d.InputDate <= TO_DATE)
                        )
                        orderby d.Id ascending
                        select new SumModel()
                        {
                            Id = d.Id,
                            Title = d.Title,
                            Sum = d.Sum,
                            InputDate = d.InputDate,
                            AccountDate = d.AccountDate,
                            DueDate = d.DueDate,
                            CreateDate = d.CreateDate,
                            CreateBy = d.CreateBy,
                            ModifyDate = d.ModifyDate,
                            ModifyBy = d.ModifyBy,
                            State = d.State
                        }).ToList();
            }
        }

        public List<SumModel> GetWithTags(DateTime? FROM_DATE = null, DateTime? TO_DATE = null)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                List<SumModel> sums = this.Get(FROM_DATE, TO_DATE);
                ISumTagConnRepository stcRepo = new SumTagConnRepository();
                List<SumTagConnModel> sumTagConn = stcRepo.Get_OrderBySumId_DepthTag();
                foreach (SumModel sumItem in sums)
                {
                    int i = 0;
                    while (i < sumTagConn.Count && sumTagConn[i].SumId < sumItem.Id)
                        i++;
                    while (i < sumTagConn.Count && sumTagConn[i].SumId == sumItem.Id)
                    {
                        if (sumTagConn[i].Tag == null)
                            throw new Exception("Property tag shouldn't be null!");

                        sumItem.Tags.Add(sumTagConn[i].Tag);
                        sumTagConn.RemoveAt(i); // i is "increased" because RemoveAt
                    }
                }

                return sums;
            }
        }
        #endregion

        #region Delete Methods
        public bool Delete(int ID)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                SumModel sum = context.Sum.Where(x => x.Id == ID).FirstOrDefault();
                if (sum != null)
                {
                    DateTime now = DateTime.Now;
                    sum.ModifyDate = now;
                    sum.ModifyBy = tmpUserId;
                    sum.State = "N";
                    context.SaveChanges();
                    return true;
                }
                else
                {
                    throw new Exception("Record not found for deletion.");
                }
            }
        }
        #endregion

        #region Save Methods
        public SumModel Save(SumModel SUM)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                SumModel sum = context.Sum.Where(x => x.Id == SUM.Id).FirstOrDefault();
                DateTime now = DateTime.Now;
                if (sum == null)
                {
                    sum = new SumModel()
                    {
                        Title = SUM.Title,
                        Sum = SUM.Sum,                        
                        AccountDate = SUM.AccountDate,
                        InputDate = SUM.InputDate,
                        DueDate = SUM.DueDate,                        
                        CreateDate = now,
                        CreateBy = tmpUserId,
                        ModifyDate = now,
                        ModifyBy = tmpUserId,
                        State = "Y"
                    };
                    this.ResolveDateTypeDefaults(sum, SUM);
                    context.Sum.Add(sum);
                }
                else
                {
                    sum.Title = SUM.Title;
                    sum.Sum = SUM.Sum;                    
                    sum.ModifyDate = now;
                    sum.ModifyBy = tmpUserId;
                    this.ResolveDateTypeDefaults(sum, SUM);
                }

                if (context.SaveChanges() >= 1)
                    return sum;
                else
                    return null;
            }
        }
        #endregion

        #region Privates
        /// <summary>
        /// Gets the api returnable, dates wrapped sums
        /// </summary>
        /// <param name="sums">Requires: <i>dateType</i>-ordered ASC!</param>
        /// <param name="dates">Requires: ordered ASC!</param>
        /// <param name="dateType"></param>
        /// <returns></returns>
        private SumsOnDayWrap AssableSumsWithDates(List<SumModel> sums, List<DateTime> dates, DateTypeEnum dateType)
        {
            SumsOnDayWrap ret = new SumsOnDayWrap();
            if (dateType == DateTypeEnum.INPUT_DATE) ret.dateType = "INPUT_DATE";
            else if (dateType == DateTypeEnum.ACCOUNT_DATE) ret.dateType = "ACCOUNT_DATE";
            else if (dateType == DateTypeEnum.DUE_DATE) ret.dateType = "DUE_DATE";

            int i = 0;
            int j = 0;
            while (i < dates.Count && j < sums.Count)
            {
                SumsOnDay dayData = new SumsOnDay();
                dayData.date = dates[i].Date;

                DateTime sumDate = sums[j].InputDate.Value; // default set
                if (dateType == DateTypeEnum.ACCOUNT_DATE) sumDate = sums[j].AccountDate.Value;
                else if (dateType == DateTypeEnum.DUE_DATE) sumDate = sums[j].DueDate.Value;

                if (dayData.date == sumDate.Date)
                {
                    while(j < sums.Count && dayData.date == sumDate.Date)
                    {
                        dayData.data.Add(sums[j]);
                        j++;

                        if(j < sums.Count)
                        {
                            sumDate = sums[j].InputDate.Value; // default set
                            if (dateType == DateTypeEnum.ACCOUNT_DATE) sumDate = sums[j].AccountDate.Value;
                            else if (dateType == DateTypeEnum.DUE_DATE) sumDate = sums[j].DueDate.Value;
                        }
                    }
                }
                i++;
                ret.data.Add(dayData);
            }

            while(i < dates.Count)
            {
                SumsOnDay dayData = new SumsOnDay();
                dayData.date = dates[i].Date;
                ret.data.Add(dayData);
                i++;
            }

            return ret;
        }

        /// <summary>
        /// Megakadályozza, hogy a 3 date közül bármelyik is null értéket kapjon
        /// </summary>
        /// <param name="setSum"></param>
        /// <param name="inputSum"></param>
        private void ResolveDateTypeDefaults(SumModel setSum, SumModel inputSum)
        {
            DateTime? defDate = inputSum.InputDate;
            if (defDate == null)
                defDate = inputSum.AccountDate;
            if (defDate == null)
                defDate = inputSum.DueDate;
            if (defDate == null)
                throw new Exception("At least one date should be not null.");

            if (inputSum.InputDate == null)
                setSum.InputDate = defDate;
            if (inputSum.AccountDate == null)
                setSum.AccountDate = defDate;
            if (inputSum.DueDate == null)
                setSum.DueDate = defDate;
        }
        #endregion
    }
}
