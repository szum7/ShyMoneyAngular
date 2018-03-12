using BusinessLibrary.Common.Enum;
using WebApp.Models;
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
        List<Sum> Get(DateTime? FROM_DATE = null, DateTime? TO_DATE = null);
        List<Sum> GetWithTags(DateTime? FROM_DATE = null, DateTime? TO_DATE = null);
        Sum Save(Sum model);
        bool Delete(int id);
    }
}
