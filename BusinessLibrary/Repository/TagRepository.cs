using CRUD.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BusinessLibrary.Repository
{
    public class TagRepository : ITagRepository
    {
        #region Get Methods
        public List<Tag> Get()
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                return (from d in context.Tag
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
                        }).ToList();
            }
        }
        #endregion

        #region Save Methods
        public Tag Save(Tag TAG)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                Tag tag = context.Tag.Where(x => x.ID == TAG.ID).FirstOrDefault();
                DateTime now = DateTime.Now;
                if (tag == null)
                {
                    tag = new Tag()
                    {
                        ID = TAG.ID,
                        TITLE = TAG.TITLE,
                        DESCRIPTION = TAG.DESCRIPTION,
                        ICON = TAG.ICON,
                        QUICKBAR_PLACE = TAG.QUICKBAR_PLACE,
                        CREATE_DATE = now,
                        CREATE_BY = TAG.CREATE_BY,
                        MODIFY_DATE = now,
                        MODIFY_BY = TAG.MODIFY_BY,
                        STATE = "Y"
                    };
                    context.Tag.Add(tag);
                }
                else
                {
                    tag.TITLE = TAG.TITLE;
                    tag.DESCRIPTION = TAG.DESCRIPTION;
                    tag.ICON = TAG.ICON;
                    tag.QUICKBAR_PLACE = TAG.QUICKBAR_PLACE;
                    tag.MODIFY_DATE = now;
                    tag.MODIFY_BY = TAG.MODIFY_BY;
                }

                if (context.SaveChanges() >= 1)
                    return TAG;
                else
                    return null;
            }
        }
        #endregion

        #region Delete Methods
        public bool Delete(int ID)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                Tag tag = context.Tag.Where(x => x.ID == ID).FirstOrDefault();
                if (tag != null)
                {
                    DateTime now = DateTime.Now;
                    tag.MODIFY_BY = 0;
                    tag.MODIFY_DATE = now;
                    tag.STATE = "N";
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
    }
}
