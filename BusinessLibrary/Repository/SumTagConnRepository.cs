using CRUD.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BusinessLibrary.Repository
{
    public class SumTagConnRepository
    {
        /// <summary>
        /// Includes: SUM_ID, TAG_ID, TAG
        /// Ordered: SUM_ID ASC
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static List<SumTagConn> Get_OrderBySumId_DepthTag()
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                return (from d in context.SumTagConn
                        orderby d.SUM_ID ascending
                        select new SumTagConn()
                        {
                            ID = d.ID,
                            SUM_ID = d.SUM_ID,
                            TAG_ID = d.TAG_ID,
                            TAG = new Tag()
                            {
                                ID = d.TAG.ID,
                                TITLE = d.TAG.TITLE,
                                DESCRIPTION = d.TAG.DESCRIPTION,
                                ICON = d.TAG.ICON,
                                QUICKBAR_PLACE = d.TAG.QUICKBAR_PLACE,
                                CREATE_DATE = d.TAG.CREATE_DATE,
                                CREATE_BY = d.TAG.CREATE_BY,
                                MODIFY_DATE = d.TAG.MODIFY_DATE,
                                MODIFY_BY = d.TAG.MODIFY_BY,
                                STATE = d.TAG.STATE
                            }
                        }).ToList<SumTagConn>();
            }
        }
    }
}
