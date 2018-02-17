﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CRUD.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BusinessLibrary.Repository
{
    public class SumRepository : ISumRepository
    {
        #region Get Methods
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
                        INPUT_DATE = SUM.INPUT_DATE,
                        ACCOUNT_DATE = SUM.ACCOUNT_DATE,
                        DUE_DATE = SUM.DUE_DATE,
                        CREATE_DATE = now,
                        CREATE_BY = SUM.CREATE_BY,
                        MODIFY_DATE = now,
                        MODIFY_BY = SUM.MODIFY_BY,
                        STATE = "Y"
                    };
                    context.Sum.Add(sum);
                }
                else
                {
                    sum.TITLE = SUM.TITLE;
                    sum.SUM = SUM.SUM;
                    sum.INPUT_DATE = SUM.INPUT_DATE;
                    sum.ACCOUNT_DATE = SUM.ACCOUNT_DATE;
                    sum.DUE_DATE = SUM.DUE_DATE;
                    sum.MODIFY_DATE = now;
                    sum.MODIFY_BY = SUM.MODIFY_BY;
                }

                if (context.SaveChanges() >= 1)
                    return SUM;
                else
                    return null;
            }
        }
        #endregion
    }
}
