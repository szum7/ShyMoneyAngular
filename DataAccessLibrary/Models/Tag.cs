using System;
using System.Collections.Generic;

namespace CRUD.Models
{
    public partial class Tag
    {
        public Tag()
        {
            SUM_TAG_CONN = new HashSet<SumTagConn>();
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

        public ICollection<SumTagConn> SUM_TAG_CONN { get; set; }
    }
}
