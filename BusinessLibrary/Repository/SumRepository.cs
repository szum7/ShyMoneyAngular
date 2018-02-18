using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CRUD.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using BusinessLibrary.Common;
using DataAccessLibrary.CustomModels;
using BusinessLibrary.Common.Enum;

namespace BusinessLibrary.Repository
{
    public class SumRepository : ISumRepository
    {
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
            List<Sum> sums = new List<Sum>();
            if (dateType == DateTypeEnum.INPUT_DATE) sums = this.GetWithTags(start, end).OrderBy(x => x.INPUT_DATE).ToList();
            else if (dateType == DateTypeEnum.ACCOUNT_DATE) sums = this.GetWithTags(start, end).OrderBy(x => x.ACCOUNT_DATE).ToList();
            else if (dateType == DateTypeEnum.DUE_DATE) sums = this.GetWithTags(start, end).OrderBy(x => x.DUE_DATE).ToList();

            return this.AssableSumsWithDates(sums, dates, dateType);
        }

        public List<Sum> Get(DateTime? FROM_DATE = null, DateTime? TO_DATE = null)
        {

            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                return (from d in context.Sum
                        where (
                          (d.STATE == "Y")
                          && (FROM_DATE == null || d.INPUT_DATE >= FROM_DATE)
                          && (TO_DATE == null || d.INPUT_DATE <= TO_DATE)
                        )
                        orderby d.ID ascending
                        select new Sum()
                        {
                            ID = d.ID,
                            TITLE = d.TITLE,
                            SUM = d.SUM,
                            INPUT_DATE = d.INPUT_DATE,
                            ACCOUNT_DATE = d.ACCOUNT_DATE,
                            DUE_DATE = d.DUE_DATE,
                            CREATE_DATE = d.CREATE_DATE,
                            CREATE_BY = d.CREATE_BY,
                            MODIFY_DATE = d.MODIFY_DATE,
                            MODIFY_BY = d.MODIFY_BY,
                            STATE = d.STATE
                        }).ToList();
            }
        }

        public List<Sum> GetWithTags(DateTime? FROM_DATE = null, DateTime? TO_DATE = null)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                List<Sum> sums = this.Get(FROM_DATE, TO_DATE);
                ISumTagConnRepository stcRepo = new SumTagConnRepository();
                List<SumTagConn> sumTagConn = stcRepo.Get_OrderBySumId_DepthTag();
                foreach (Sum sumItem in sums)
                {
                    int i = 0;
                    while (i < sumTagConn.Count && sumTagConn[i].SUM_ID < sumItem.ID)
                        i++;
                    while (i < sumTagConn.Count && sumTagConn[i].SUM_ID == sumItem.ID)
                    {
                        if (sumTagConn[i].TAG == null)
                            throw new Exception("Property tag shouldn't be null!");

                        sumItem.tags.Add(sumTagConn[i].TAG);
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
                Sum sum = context.Sum.Where(x => x.ID == ID).FirstOrDefault();
                if (sum != null)
                {
                    DateTime now = DateTime.Now;
                    sum.MODIFY_BY = 0;
                    sum.MODIFY_DATE = now;
                    sum.STATE = "N";
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
        public Sum Save(Sum SUM)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                Sum sum = context.Sum.Where(x => x.ID == SUM.ID).FirstOrDefault();
                DateTime now = DateTime.Now;
                if (sum == null)
                {
                    sum = new Sum()
                    {
                        ID = SUM.ID,
                        TITLE = SUM.TITLE,
                        SUM = SUM.SUM,                        
                        CREATE_DATE = now,
                        CREATE_BY = SUM.CREATE_BY,
                        MODIFY_DATE = now,
                        MODIFY_BY = SUM.MODIFY_BY,
                        STATE = "Y"
                    };
                    this.ResolveDateTypeDefaults(sum, SUM);
                    context.Sum.Add(sum);
                }
                else
                {
                    sum.TITLE = SUM.TITLE;
                    sum.SUM = SUM.SUM;                    
                    sum.MODIFY_DATE = now;
                    sum.MODIFY_BY = SUM.MODIFY_BY;
                    this.ResolveDateTypeDefaults(sum, SUM);
                }

                if (context.SaveChanges() >= 1)
                    return SUM;
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
        private SumsOnDayWrap AssableSumsWithDates(List<Sum> sums, List<DateTime> dates, DateTypeEnum dateType)
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

                DateTime sumDate = sums[j].INPUT_DATE.Value; // default set
                if (dateType == DateTypeEnum.ACCOUNT_DATE) sumDate = sums[j].ACCOUNT_DATE.Value;
                else if (dateType == DateTypeEnum.DUE_DATE) sumDate = sums[j].DUE_DATE.Value;

                if (dayData.date == sumDate.Date)
                {
                    while(j < sums.Count && dayData.date == sumDate.Date)
                    {
                        dayData.data.Add(sums[j]);
                        j++;

                        if(j < sums.Count)
                        {
                            sumDate = sums[j].INPUT_DATE.Value; // default set
                            if (dateType == DateTypeEnum.ACCOUNT_DATE) sumDate = sums[j].ACCOUNT_DATE.Value;
                            else if (dateType == DateTypeEnum.DUE_DATE) sumDate = sums[j].DUE_DATE.Value;
                        }
                    }
                }
                i++;
                ret.data.Add(dayData);
            }
            return ret;
        }

        private void ResolveDateTypeDefaults(Sum setSum, Sum inputSum)
        {
            DateTime? defDate = inputSum.INPUT_DATE;
            if (defDate == null)
                defDate = inputSum.ACCOUNT_DATE;
            if (defDate == null)
                defDate = inputSum.DUE_DATE;
            if (defDate == null)
                throw new Exception("At least one date should be not null.");

            if (inputSum.INPUT_DATE == null)
                setSum.INPUT_DATE = defDate;
            if (inputSum.ACCOUNT_DATE == null)
                setSum.ACCOUNT_DATE = defDate;
            if (inputSum.DUE_DATE == null)
                setSum.DUE_DATE = defDate;
        }
        #endregion
    }
}
