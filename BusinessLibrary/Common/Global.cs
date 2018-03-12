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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="from">2010-01-01</param>
        /// <param name="to">2010-01-01</param>
        /// <returns></returns>
        public static List<string> GetDateStringsInRange(string from, string to)
        {
            DateTime fromDate;
            DateTime toDate;
            try
            {
                fromDate = new DateTime(int.Parse(from.Substring(0, 4)), int.Parse(from.Substring(5, 2)), int.Parse(from.Substring(8, 2)));
                toDate = new DateTime(int.Parse(to.Substring(0, 4)), int.Parse(to.Substring(5, 2)), int.Parse(to.Substring(8, 2)));
            }
            catch (Exception e)
            {
                throw e;
            }
            List<string> dates = new List<string>();
            for (DateTime dt = fromDate; dt <= toDate; dt = dt.AddDays(1))
            {
                dates.Add(dt.ToString("yyyy-MM-dd"));
            }
            return dates;
        }
    }
}
