using BusinessLibrary.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public class DateRepo : IDateRepo
    {
        public List<string> GetDateStringRange(string dateFrom, string dateTo)
        {
            return Global.GetDateStringsInRange(dateFrom, dateTo);
        }
    }
}
