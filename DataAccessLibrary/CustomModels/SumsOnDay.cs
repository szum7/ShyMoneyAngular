using DataAccessLibrary.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLibrary.CustomModels
{
    public class SumsOnDay
    {
        public DateTime date { get; set; }
        public List<SumModel> data { get; set; }
        public SumsOnDay()
        {
            this.data = new List<SumModel>();
        }
    }
}
