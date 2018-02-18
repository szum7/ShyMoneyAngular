using CRUD.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLibrary.CustomModels
{
    public class SumsOnDay
    {
        public DateTime date { get; set; }
        public List<Sum> data { get; set; }
        public SumsOnDay()
        {
            this.data = new List<Sum>();
        }
    }
}
