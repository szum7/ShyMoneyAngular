using CRUD.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public interface ITagRepository
    {
        #region Sync Methods
        List<Tag> Get();
        Tag Save(Tag model);
        bool Delete(int id);
        #endregion
    }
}
