using System;
using System.Collections.Generic;

namespace WebApp.Models
{
    public partial class TagModel
    {
        public TagModel()
        {
            SUM_TAG_CONN = new HashSet<SumTagConnModel>();
        }

        public decimal ID { get; set; }
        public string TITLE { get; set; }
        public string DESCRIPTION { get; set; }
        public string ICON { get; set; }
        public decimal? QUICKBAR_PLACE { get; set; }
        public decimal? MODIFY_BY { get; set; }
        public DateTime? MODIFY_DATE { get; set; }
        public decimal? CREATE_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public string STATE { get; set; }

        public ICollection<SumTagConnModel> SUM_TAG_CONN { get; set; }
    }
}
