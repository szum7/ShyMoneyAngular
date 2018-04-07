using System;
using System.Collections.Generic;

namespace DataAccessLibrary.Models
{
    public partial class IntellisenseModel
    {
        public decimal Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string SumTitle { get; set; }
        public string SumDescription { get; set; }
        public decimal? SumSum { get; set; }
        public DateTime? SumInputDate { get; set; }
        public DateTime? SumAccountDate { get; set; }
        public DateTime? SumDueDate { get; set; }
        public bool? IsDatesMatch { get; set; }
        public bool? IsSaveOnSelect { get; set; }
        public bool? IsTodayDates { get; set; }
        public bool? IsDatesOverwriteable { get; set; }

        public decimal? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public decimal? CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public string State { get; set; }

        public ICollection<IntellisenseTagConnModel> IntellisenseTagConn { get; set; }
    }
}
