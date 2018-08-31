using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public interface ICalculationRepo
    {
        List<MonthlyResult> MonthlySumups(int FROM_YEAR, int FROM_MONTH, int TO_YEAR, int TO_MONTH);
    }
}
