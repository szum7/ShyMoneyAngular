using DataAccessLibrary.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLibrary.CustomModels
{
    public class SumsOnDay
    {
        public DateTime Date { get; set; }
        public List<SumModel> Data { get; set; }
        public SumsOnDay()
        {
            this.Data = new List<SumModel>();
        }
    }
}
