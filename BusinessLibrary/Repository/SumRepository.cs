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
        public List<Sum> GetSync(DateTime? fromDate = null, DateTime? toDate = null)
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

        #region Get Methods
        public async Task<List<Sum>> Get(DateTime? fromDate = null, DateTime? toDate = null)
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

        //public async Task<List<Sum>> GetWithTags(DateTime? fromDate = null, DateTime? toDate = null)
        //{
        //    using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
        //    {
        //        Task<List<Sum>> sums = this.Get(fromDate, toDate);
        //        List<SumTagConn> sumTagConn = SumTagConnDAL.Get(SumTagConnOrderByEnum.sumId, SumTagConnGetDepthEnum.tag);
        //        foreach (Sum sumItem in sums)
        //        {
        //            int i = 0;
        //            while (i < sumTagConn.Count && sumTagConn[i].sumId < sumItem.id)
        //                i++;
        //            while (i < sumTagConn.Count && sumTagConn[i].sumId == sumItem.id)
        //            {
        //                if (sumTagConn[i].tag == null)
        //                    throw new Exception("Property tag shouldn't be null!");

        //                sumItem.tags.Add(sumTagConn[i].tag);
        //                sumTagConn.RemoveAt(i);
        //                // i is "increased" because RemoveAt
        //            }
        //        }

        //        return sums;
        //    }
        //}
        #endregion

        #region Update Methods
        public static void Update()
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
            }
        }
        #endregion

        #region Delete Methods
        public static void Delete()
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
            }
        }
        #endregion

        #region Save Methods
        public static void Save()
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
            }
        }
        #endregion
        
        #region Tutorial Methods
        public async Task<bool> DeleteSumByID(int id)
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

        public async Task<List<Sum>> GetAllSum()
        {
            using (DBSHYMONEYV1Context db = new DBSHYMONEYV1Context())
            {
                DateTime dateLimit = new DateTime(2017, 10, 1);
                return await (from a in db.Sum
                              where a.DATE > dateLimit
                              select new Sum()
                              {
                                  ID = a.ID,
                                  TITLE = a.TITLE,
                                  SUM = a.SUM,
                                  DATE = a.DATE
                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveSum(Sum model)
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

                return await db.SaveChangesAsync() >= 1;
            }
        }
        #endregion
    }
}
