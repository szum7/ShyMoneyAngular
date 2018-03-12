using System;
using System.Collections.Generic;

namespace WebApp.Models
{
    public partial class Sum
    {
        public Sum()
        {
            SUM_TAG_CONN = new HashSet<SumTagConn>();
            this.tags = new List<Tag>();
        }

        public decimal ID { get; set; }
        public string TITLE { get; set; }
        public decimal? SUM { get; set; }
        public DateTime? INPUT_DATE { get; set; }
        public DateTime? ACCOUNT_DATE { get; set; }
        public DateTime? DUE_DATE { get; set; }
        public decimal? MODIFY_BY { get; set; }
        public DateTime? MODIFY_DATE { get; set; }
        public decimal? CREATE_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public string STATE { get; set; }

        public ICollection<SumTagConn> SUM_TAG_CONN { get; set; }

        #region Custom fields
        public List<Tag> tags { get; set; }
        #endregion
    }
}
