using WebApp.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public interface ITagRepository
    {
        List<TagModel> Get();
        TagModel Save(TagModel model);
        bool Delete(int id);
    }
}
