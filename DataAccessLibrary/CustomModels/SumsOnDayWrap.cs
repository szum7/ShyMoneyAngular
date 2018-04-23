using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLibrary.CustomModels
{
    public class SumsOnDayWrap
    {
        public string DateType { get; set; } // INPUT_DATE/ACCOUNT_DATE/DUE_DATE
        public List<SumsOnDay> Data { get; set; }
        public SumsOnDayWrap()
        {
            this.Data = new List<SumsOnDay>();
            this.DateType = "UNSET";
        }
    }
}
