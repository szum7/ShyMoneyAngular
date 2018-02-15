using CRUD.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public interface ITagRepository
    {
        List<Tag> Get();
        Tag Save(Tag model);
        bool Delete(int id);
    }
}
