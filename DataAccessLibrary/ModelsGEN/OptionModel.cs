using System;
using System.Collections.Generic;

namespace DataAccessLibrary.Models
{
    public partial class OptionModel
    {
        public decimal Id { get; set; }
        public decimal OwnerId { get; set; }
        public string Title { get; set; }
        public bool? IsActive { get; set; }
        public decimal? StartingSum { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? MasterDateFrom { get; set; }
        public DateTime? MasterDateTo { get; set; }
        public DateTime? GraphviewDateFrom { get; set; }
        public DateTime? GraphviewDateTo { get; set; }
        public DateTime? PeriodaveragesDateFrom { get; set; }
        public DateTime? PeriodaveragesDateTo { get; set; }
        public DateTime? MonthlyaveragesDateFrom { get; set; }
        public DateTime? MonthlyaveragesDateTo { get; set; }
        public decimal? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public decimal? CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public string State { get; set; }

        public UserModel Owner { get; set; }
    }
}
