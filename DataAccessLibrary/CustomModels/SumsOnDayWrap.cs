using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLibrary.CustomModels
{
    public class SumsOnDayWrap
    {
        public string dateType { get; set; } // INPUT_DATE/ACCOUNT_DATE/DUE_DATE
        public List<SumsOnDay> data { get; set; }
        public SumsOnDayWrap()
        {
            this.data = new List<SumsOnDay>();
            this.dateType = "UNSET";
        }
    }
}
