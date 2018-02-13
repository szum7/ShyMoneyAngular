using System;
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
        #region Sync Methods

        #region - Get Methods
        public List<Sum> Get(DateTime? fromDate = null, DateTime? toDate = null)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                return (from d in context.Sum
                        where (
                          (d.STATE == "Y")
                          && (fromDate == null || d.DATE >= fromDate)
                          && (toDate == null || d.DATE <= toDate)
                        )
                        orderby d.ID ascending
                        select new Sum()
                        {
                            ID = d.ID,
                            TITLE = d.TITLE,
                            SUM = d.SUM,
                            DATE = d.DATE,
                            CREATE_DATE = d.CREATE_DATE,
                            CREATE_BY = d.CREATE_BY,
                            MODIFY_DATE = d.MODIFY_DATE,
                            MODIFY_BY = d.MODIFY_BY,
                            STATE = d.STATE
                        }).ToList();
            }
        }

        public List<Sum> GetWithTags(DateTime? fromDate = null, DateTime? toDate = null)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                List<Sum> sums = this.Get(fromDate, toDate);
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

        #region - Delete Methods
        public bool Delete(int id)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                return false;
            }
        }
        #endregion

        #region - Save Methods
        public Sum Save(Sum model)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                return null;
            }
        }
        #endregion

        #endregion Sync Methods


        #region Async Methods

        #region - Get Methods
        public async Task<List<Sum>> GetAsync(DateTime? fromDate = null, DateTime? toDate = null)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                return await (from d in context.Sum
                              where (
                                (d.STATE == "Y")
                                && (fromDate == null || d.DATE >= fromDate)
                                && (toDate == null || d.DATE <= toDate)
                              )
                              orderby d.ID ascending
                              select new Sum()
                              {
                                  ID = d.ID,
                                  TITLE = d.TITLE,
                                  SUM = d.SUM,
                                  DATE = d.DATE,
                                  CREATE_DATE = d.CREATE_DATE,
                                  CREATE_BY = d.CREATE_BY,
                                  MODIFY_DATE = d.MODIFY_DATE,
                                  MODIFY_BY = d.MODIFY_BY,
                                  STATE = d.STATE
                              }).ToListAsync();
            }
        }
        #endregion

        #region - Delete Methods
        public async Task<bool> DeleteAsync(int id)
        {
            using (DBSHYMONEYV1Context db = new DBSHYMONEYV1Context())
            {

                Sum sum = db.Sum.Where(x => x.ID == id).FirstOrDefault();
                if (sum != null)
                {
                    db.Sum.Remove(sum);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }
        #endregion

        #region - Save Methods
        public async Task<Sum> SaveAsync(Sum model)
        {
            using (DBSHYMONEYV1Context db = new DBSHYMONEYV1Context())
            {
                Sum sum = db.Sum.Where(x => x.ID == model.ID).FirstOrDefault();
                if (sum == null)
                {
                    sum = new Sum()
                    {
                        ID = model.ID,
                        SUM = model.SUM,
                        TITLE = model.TITLE,
                        DATE = model.DATE
                    };
                    db.Sum.Add(sum);

                }
                else
                {
                    sum.SUM = model.SUM;
                    sum.TITLE = model.TITLE;
                    sum.DATE = model.DATE;
                }

                if (await db.SaveChangesAsync() >= 1)
                    return model;
                else
                    return null;
            }
        }
        #endregion

        #endregion Async Methods  
    }
}
