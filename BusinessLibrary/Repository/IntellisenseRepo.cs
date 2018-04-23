using System;
using System.Collections.Generic;
using System.Linq;
using DataAccessLibrary.Models;
using BusinessLibrary.Common;

namespace BusinessLibrary.Repository
{
    public class IntellisenseRepo: IIntellisenseRepo
    {
        private decimal tmpUserId = 2;

        #region Get Methods
        public List<IntellisenseModel> Get()
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                List<IntellisenseModel> ret = (from d in context.Intellisense
                                               where d.State == "Y"
                                               orderby d.Id ascending
                                               select new IntellisenseModel()
                                               {
                                                   Id = d.Id,
                                                   Title = d.Title,
                                                   SumTitle = d.SumTitle,
                                                   SumDescription = d.SumDescription,
                                                   SumSum = d.SumSum,
                                                   SumInputDate = d.SumInputDate,
                                                   SumAccountDate = d.SumAccountDate,
                                                   SumDueDate = d.SumDueDate,
                                                   IntellisenseTagConn = d.IntellisenseTagConn,
                                                   CreateDate = d.CreateDate,
                                                   CreateBy = d.CreateBy,
                                                   ModifyDate = d.ModifyDate,
                                                   ModifyBy = d.ModifyBy
                                               }).ToList();

                ret = AssembleWithTags(ret);

                // Strip models to JSON conversion
                foreach (IntellisenseModel item in ret)
                {
                    item.IntellisenseTagConn = null;
                }

                return ret;
            }
        }

        public List<IntellisenseModel> GetOnLike(string like)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                List<IntellisenseModel> ret = (from d in context.Intellisense
                                               where (d.State == "Y" && d.Title.Contains(like))
                                               orderby d.Id ascending
                                               select new IntellisenseModel()
                                               {
                                                   Id = d.Id,
                                                   Title = d.Title,
                                                   SumTitle = d.SumTitle,
                                                   SumDescription = d.SumDescription,
                                                   SumSum = d.SumSum,
                                                   SumInputDate = d.SumInputDate,
                                                   SumAccountDate = d.SumAccountDate,
                                                   SumDueDate = d.SumDueDate,
                                                   Tags = null,
                                                   CreateDate = d.CreateDate,
                                                   CreateBy = d.CreateBy,
                                                   ModifyDate = d.ModifyDate,
                                                   ModifyBy = d.ModifyBy
                                               }).ToList();

                ret = AssembleWithTags(ret);

                // Strip models to JSON conversion
                foreach (IntellisenseModel item in ret)
                {
                    item.IntellisenseTagConn = null;
                }

                return ret;
            }
        }
        #endregion

        #region Delete Methods
        public bool Delete(int ID)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                IntellisenseModel model = context.Intellisense.Where(x => x.Id == ID).FirstOrDefault();
                if (model != null)
                {
                    DateTime now = DateTime.Now;
                    model.ModifyBy = tmpUserId;
                    model.ModifyDate = now;
                    model.State = "N";
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
        public IntellisenseModel Save(IntellisenseModel input)
        {
            using (DBSHYMONEYV1Context context = new DBSHYMONEYV1Context())
            {
                IntellisenseModel model = context.Intellisense.Where(x => x.Id == input.Id).FirstOrDefault();
                DateTime now = DateTime.Now;
                if (model == null)
                {
                    model = new IntellisenseModel()
                    {
                        Title = input.Title,
                        SumSum = input.SumSum,
                        SumAccountDate = input.SumAccountDate,
                        SumInputDate = input.SumInputDate,
                        SumDueDate = input.SumDueDate,
                        CreateDate = now,
                        CreateBy = tmpUserId,
                        ModifyDate = now,
                        ModifyBy = tmpUserId,
                        State = "Y"
                    };
                    context.Intellisense.Add(model);
                }
                else
                {
                    model.Title = input.Title;
                    model.SumSum = input.SumSum;
                    model.ModifyDate = now;
                    model.ModifyBy = tmpUserId;
                }

                if (context.SaveChanges() >= 1)
                    return model;
                else
                    return null;
            }
        }
        #endregion

        #region Private Methods
        List<IntellisenseModel> AssembleWithTags(List<IntellisenseModel> intellisenses)
        {
            List<TagModel> tags = (new TagRepo()).Get();
            foreach (IntellisenseModel i_Intell in intellisenses)
            {
                foreach (IntellisenseTagConnModel i_IntellTag in i_Intell.IntellisenseTagConn)
                {
                    TagModel tag = tags.Where(x => x.Id == i_IntellTag.TagId).SingleOrDefault();

                    i_Intell.Tags.Add(new TagModel()
                    {
                        Id = tag.Id,
                        Title = tag.Title,
                        Description = tag.Description,
                        Icon = tag.Icon,
                        QuickbarPlace = tag.QuickbarPlace,
                        ModifyDate = tag.ModifyDate,
                        ModifyBy = tag.ModifyBy,
                        CreateDate = tag.CreateDate,
                        CreateBy = tag.CreateBy
                    });
                }
            }
            return intellisenses;
        }
        #endregion
    }
}
