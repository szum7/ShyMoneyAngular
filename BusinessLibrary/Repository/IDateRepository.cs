using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public interface IDateRepository
    {
        List<string> GetDateStringRange(string dateFrom, string dateTo);
    }
}
