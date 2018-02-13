using CRUD.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BusinessLibrary.Repository
{
    public class TagRepository
    {
        public async Task<List<Tag>> Get()
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                return await (from d in context.Tag
                              where d.STATE == "Y"
                              orderby d.ID ascending
                              select new Tag()
                              {
                                  ID = d.ID,
                                  TITLE = d.TITLE,
                                  DESCRIPTION = d.DESCRIPTION,
                                  ICON = d.ICON,
                                  QUICKBAR_PLACE = d.QUICKBAR_PLACE,
                                  CREATE_DATE = d.CREATE_DATE,
                                  CREATE_BY = d.CREATE_BY,
                                  MODIFY_DATE = d.MODIFY_DATE,
                                  MODIFY_BY = d.MODIFY_BY,
                                  STATE = d.STATE
                              }).ToListAsync();
            }
        }
    }
}
