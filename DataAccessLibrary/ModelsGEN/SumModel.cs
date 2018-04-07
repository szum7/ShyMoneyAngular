using System;
using System.Collections.Generic;

namespace DataAccessLibrary.Models
{
    public partial class SumModel
    {
        public decimal Id { get; set; }
        public string Title { get; set; }
        public decimal? Sum { get; set; }
        public DateTime? InputDate { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? AccountDate { get; set; }
        public string IsPayed { get; set; }

        public decimal? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public decimal? CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public string State { get; set; }

        public ICollection<SumTagConnModel> SumTagConn { get; set; }
    }
}
