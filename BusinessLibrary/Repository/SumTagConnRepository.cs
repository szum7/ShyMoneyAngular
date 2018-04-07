using DataAccessLibrary.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BusinessLibrary.Repository
{
    public class SumTagConnRepository : ISumTagConnRepository
    {
        /// <summary>
        /// Includes: properties, TAG
        /// Ordered: SUM_ID ASC
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public List<SumTagConnModel> Get_OrderBySumId_DepthTag()
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                return (from d in context.SumTagConn
                        orderby d.SumId ascending
                        select new SumTagConnModel()
                        {
                            Id = d.Id,
                            SumId = d.SumId,
                            TagId = d.TagId,
                            Tag = new TagModel()
                            {
                                Id = d.Tag.Id,
                                Title = d.Tag.Title,
                                Description = d.Tag.Description,
                                Icon = d.Tag.Icon,
                                QuickbarPlace = d.Tag.QuickbarPlace,
                                CreateDate = d.Tag.CreateDate,
                                CreateBy = d.Tag.CreateBy,
                                ModifyDate = d.Tag.ModifyDate,
                                ModifyBy = d.Tag.ModifyBy,
                                State = d.Tag.State
                            }
                        }).ToList();
            }
        }
    }
}
