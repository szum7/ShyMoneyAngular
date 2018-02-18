using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Common
{
    public class Global
    {
        public static List<DateTime> GetDatesInRange(DateTime from, DateTime to)
        {
            List<DateTime> dates = new List<DateTime>();
            for (var dt = from; dt <= to; dt = dt.AddDays(1))
            {
                dates.Add(dt);
            }
            return dates;
        }
    }
}
