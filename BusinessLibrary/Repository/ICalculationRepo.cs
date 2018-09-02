using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Repository
{
    public interface ICalculationRepo
    {
        List<TagTotalResult> TagTotalResult(int FROM_YEAR, int FROM_MONTH, int FROM_DAY, int TO_YEAR, int TO_MONTH, int TO_DAY, bool FakeData);
        List<MonthlyResult> MonthlySumups(int FROM_YEAR, int FROM_MONTH, int TO_YEAR, int TO_MONTH, bool fakeData);
    }
}
