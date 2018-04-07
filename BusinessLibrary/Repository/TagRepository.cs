using DataAccessLibrary.Models;
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
        private decimal tmpUserId = 2;

        #region Get Methods
        public List<TagModel> Get()
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                return (from d in context.Tag
                        where d.State == "Y"
                        orderby d.Id ascending
                        select new TagModel()
                        {
                            Id = d.Id,
                            Title = d.Title,
                            Description = d.Description,
                            Icon = d.Icon,
                            QuickbarPlace = d.QuickbarPlace,
                            CreateDate = d.CreateDate,
                            CreateBy = d.CreateBy,
                            ModifyDate = d.ModifyDate,
                            ModifyBy = d.ModifyBy,
                            State = d.State
                        }).ToList();
            }
        }
        #endregion

        #region Save Methods
        public TagModel Save(TagModel TAG)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                TagModel tag = context.Tag.Where(x => x.Id == TAG.Id).FirstOrDefault();
                DateTime now = DateTime.Now;
                if (tag == null)
                {
                    tag = new TagModel()
                    {
                        Id = TAG.Id,
                        Title = TAG.Title,
                        Description = TAG.Description,
                        Icon = TAG.Icon,
                        QuickbarPlace = TAG.QuickbarPlace,
                        CreateDate = now,
                        CreateBy = tmpUserId,
                        ModifyDate = now,
                        ModifyBy = tmpUserId,
                        State = "Y"
                    };
                    context.Tag.Add(tag);
                }
                else
                {
                    tag.Title = TAG.Title;
                    tag.Description = TAG.Description;
                    tag.Icon = TAG.Icon;
                    tag.QuickbarPlace = TAG.QuickbarPlace;
                    tag.ModifyDate = now;
                    tag.ModifyBy = tmpUserId;
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
                TagModel tag = context.Tag.Where(x => x.Id == ID).FirstOrDefault();
                if (tag != null)
                {
                    DateTime now = DateTime.Now;
                    tag.ModifyBy = tmpUserId;
                    tag.ModifyDate = now;
                    tag.State = "N";
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
