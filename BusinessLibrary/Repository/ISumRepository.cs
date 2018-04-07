using BusinessLibrary.Common.Enum;
using DataAccessLibrary.Models;
using DataAccessLibrary.CustomModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLibrary.Repository
{
    public interface ISumRepository
    {
        SumsOnDayWrap GetOnDates(DateTypeEnum dateType, DateTime? FROM_DATE = null, DateTime? TO_DATE = null);
        List<SumModel> Get(DateTime? FROM_DATE = null, DateTime? TO_DATE = null);
        List<SumModel> GetWithTags(DateTime? FROM_DATE = null, DateTime? TO_DATE = null);
        SumModel Save(SumModel model);
        bool Delete(int id);
    }
}
