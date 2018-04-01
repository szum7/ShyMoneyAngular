using System;
using System.Collections.Generic;

namespace WebApp.Models
{
    public partial class SumModel
    {
        public SumModel()
        {
            SUM_TAG_CONN = new HashSet<SumTagConnModel>();
            this.tags = new List<TagModel>();
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
        public string IS_PAYED { get; set; }

        public ICollection<SumTagConnModel> SUM_TAG_CONN { get; set; }

        #region Custom fields
        public List<TagModel> tags { get; set; }
        #endregion
    }
}
