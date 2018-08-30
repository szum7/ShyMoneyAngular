using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public interface ICalculationRepo
    {
        List<MonthlySum> MonthlySumups(DateTime FROM_DATE, DateTime TO_DATE);
    }
}
