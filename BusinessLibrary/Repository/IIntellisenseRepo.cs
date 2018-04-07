using DataAccessLibrary.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public interface IIntellisenseRepo
    {
        List<IntellisenseModel> Get();
        List<IntellisenseModel> GetOnLike(string like);
        IntellisenseModel Save(IntellisenseModel model);
        bool Delete(int id);
    }
}
